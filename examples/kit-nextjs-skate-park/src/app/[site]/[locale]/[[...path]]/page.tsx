import { isDesignLibraryPreviewData } from "@sitecore-content-sdk/nextjs/editing";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { SiteInfo } from "@sitecore-content-sdk/nextjs";
import sites from ".sitecore/sites.json";
import { routing } from "src/i18n/routing";
import scConfig from "sitecore.config";
import client from "src/lib/sitecore-client";
import Layout, { RouteFields } from "src/Layout";
import components from ".sitecore/component-map";
import Providers from "src/Providers";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
    [key: string]: string | string[] | undefined;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { site, locale, path } = await params;
  const draft = await draftMode();

  // Set site and locale to be available in src/i18n/request.ts for fetching the dictionary
  setRequestLocale(`${site}_${locale}`);

  // Fetch the page data from Sitecore
  let page;
  if (draft.isEnabled) {
    const editingParams = await searchParams;
    if (isDesignLibraryPreviewData(editingParams)) {
      page = await client.getDesignLibraryData(editingParams);
    } else {
      page = await client.getPreview(editingParams);
    }
  } else {
    page = await client.getPage(path ?? [], { site, locale });
  }

  // If the page is not found, return a 404
  if (!page) {
    notFound();
  }

  // Fetch the component data from Sitecore (Likely will be deprecated)
  console.log('SERVER: About to call getComponentData. Components in map:', Array.from(components.keys()));
  let componentProps = {};
  try {
    componentProps = await client.getComponentData(
      page.layout,
      {},
      components
    );
    console.log('SERVER: getComponentData returned. Keys:', Object.keys(componentProps));
  } catch (error) {
    console.error('SERVER: getComponentData ERROR:', error);
  }
  console.log('SERVER: FlexCardContainer in componentProps?', 'FlexCardContainer' in componentProps);
  console.log('SERVER: FullWidthHeroCard in componentProps?', 'FullWidthHeroCard' in componentProps);
  
  // Check if FlexCardContainer UID is in componentProps
  const flexCardUid = '4dafb3dc-e197-4210-9e31-2d09b3e7ab18';
  const componentPropsRecord = componentProps as Record<string, unknown>;
  if (componentPropsRecord[flexCardUid]) {
    console.log('SERVER: FlexCardContainer UID found! Data:', JSON.stringify(componentPropsRecord[flexCardUid], null, 2).substring(0, 500));
  }

  // Debug: Search ENTIRE page structure for FlexCardContainer
  const findAllComponents = (obj: unknown, path = '', depth = 0): Array<{name: string; uid: string; path: string; hasFields: boolean; hasDataSource: boolean}> => {
    const results: Array<{name: string; uid: string; path: string; hasFields: boolean; hasDataSource: boolean}> = [];
    if (depth > 15) return results;
    
    if (!obj || typeof obj !== 'object') return results;
    
    const objRecord = obj as Record<string, unknown>;
    
    if (objRecord.componentName && typeof objRecord.componentName === 'string') {
      results.push({
        name: objRecord.componentName,
        uid: typeof objRecord.uid === 'string' ? objRecord.uid : '',
        path: path,
        hasFields: !!objRecord.fields,
        hasDataSource: !!objRecord.dataSource,
      });
    }
    
    if (objRecord.placeholders && typeof objRecord.placeholders === 'object') {
      const placeholders = objRecord.placeholders as Record<string, unknown>;
      for (const key of Object.keys(placeholders)) {
        const items = Array.isArray(placeholders[key]) ? placeholders[key] : [placeholders[key]];
        items.forEach((component, idx) => {
          results.push(...findAllComponents(component, `${path}/${key}[${idx}]`, depth + 1));
        });
      }
    }
    
    if (Array.isArray(obj)) {
      obj.forEach((item, idx) => {
        results.push(...findAllComponents(item, `${path}[${idx}]`, depth + 1));
      });
    }
    
    return results;
  };
  
  const allComponents = findAllComponents(page.layout);
  console.log('SERVER: ALL components in page.layout:', allComponents.map(c => `${c.name} (${c.uid})`));
  const flexCard = allComponents.find(c => c.name === 'FlexCardContainer' || c.uid === '4dafb3dc-e197-4210-9e31-2d09b3e7ab18');
  console.log('SERVER: FlexCardContainer found?', !!flexCard);
  if (flexCard) {
    console.log('SERVER: FlexCardContainer details:', flexCard);
  } else {
    console.log('SERVER: FlexCardContainer NOT in layout. FullWidthHeroCard found?', allComponents.some(c => c.name === 'FullWidthHeroCard'));
  }
  
  // Check the actual layout structure - components might be in a different location
  const layout = page.layout as Record<string, unknown>;
  console.log('SERVER: Top-level layout keys:', Object.keys(layout));
  console.log('SERVER: layout.sitecore keys:', layout.sitecore ? Object.keys(layout.sitecore as Record<string, unknown>) : 'no sitecore');
  
  // Check if there's a route with components
  const route = (layout.sitecore as Record<string, unknown>)?.route as Record<string, unknown> | undefined;
  if (route) {
    console.log('SERVER: route keys:', Object.keys(route));
    if (route.placeholders) {
      const placeholders = route.placeholders as Record<string, unknown>;
      console.log('SERVER: route.placeholders keys:', Object.keys(placeholders));
      Object.keys(placeholders).forEach(key => {
        const items = placeholders[key];
        if (Array.isArray(items)) {
          console.log(`SERVER: route.placeholders["${key}"] has ${items.length} items`);
          items.forEach((item, idx) => {
            const comp = item as Record<string, unknown>;
            console.log(`SERVER:   [${idx}]: ${comp.componentName || 'no name'} (${comp.uid || 'no uid'}) - hasFields: ${!!comp.fields} - dataSource: ${comp.dataSource || 'NONE'}`);
            if (comp.componentName === 'FullWidthHeroCard' || comp.componentName === 'FlexCardContainer' || comp.componentName === 'Container') {
              const fieldsStr = comp.fields ? JSON.stringify(comp.fields, null, 2) : 'no fields';
              console.log(`SERVER:     FIELDS:`, fieldsStr.substring ? fieldsStr.substring(0, 300) : fieldsStr);
              // If it's a Container, check if it has nested placeholders
              if (comp.componentName === 'Container' && comp.placeholders) {
                const containerPlaceholders = comp.placeholders as Record<string, unknown>;
                console.log(`SERVER:     Container placeholders:`, Object.keys(containerPlaceholders));
                Object.keys(containerPlaceholders).forEach(phKey => {
                  const phItems = containerPlaceholders[phKey];
                  if (Array.isArray(phItems)) {
                    phItems.forEach((item, idx) => {
                      const nestedComp = item as Record<string, unknown>;
                      console.log(`SERVER:       Container[${phKey}][${idx}]: ${nestedComp.componentName || 'no name'} (${nestedComp.uid || 'no uid'}) - hasFields: ${!!nestedComp.fields} - dataSource: ${nestedComp.dataSource || 'none'}`);
                      if (nestedComp.componentName === 'FlexCardContainer') {
                        console.log(`SERVER:         FlexCardContainer dataSource: ${nestedComp.dataSource}`);
                        console.log(`SERVER:         FlexCardContainer fields:`, nestedComp.fields ? 'EXISTS' : 'MISSING');
                      }
                    });
                  }
                });
              }
            }
          });
        }
      });
    }
  }

  return (
    <NextIntlClientProvider>
      <Providers page={page} componentProps={componentProps}>
        <Layout page={page} />
      </Providers>
    </NextIntlClientProvider>
  );
}

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const generateStaticParams = async () => {
  if (process.env.NODE_ENV !== "development" && scConfig.generateStaticPaths) {
    // Filter sites to only include the sites this starter is designed to serve.
    // This prevents cross-site build errors when multiple starters share the same XM Cloud instance.
    const defaultSite = scConfig.defaultSite;
    const allowedSites = defaultSite
      ? sites
          .filter((site: SiteInfo) => site.name === defaultSite)
          .map((site: SiteInfo) => site.name)
      : sites.map((site: SiteInfo) => site.name);

    return await client.getAppRouterStaticParams(
      allowedSites,
      routing.locales.slice()
    );
  }
  return [];
};

// Metadata fields for the page.
export const generateMetadata = async ({ params }: PageProps) => {
  const { path, site, locale } = await params;

  // The same call as for rendering the page. Should be cached by default react behavior
  const page = await client.getPage(path ?? [], { site, locale });
  return {
    title:
      (
        page?.layout.sitecore.route?.fields as RouteFields
      )?.Title?.value?.toString() || "Page",
  };
};
