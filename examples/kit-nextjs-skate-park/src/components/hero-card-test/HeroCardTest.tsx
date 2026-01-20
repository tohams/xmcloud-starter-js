import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Logo?: { jsonValue?: unknown };
  Title?: { jsonValue?: unknown };
  Subheading?: { jsonValue?: unknown };
  DonateOnceLink?: { jsonValue?: unknown };
  DonateMonthlyLink?: { jsonValue?: unknown };
  HeroImage?: { jsonValue?: unknown };
}

type HeroCardTestProps = ComponentProps & {
  fields: {
    data?: {
      datasource?: Fields;
    };
  };
};

const Default = (props: HeroCardTestProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  // Safe destructuring with fallbacks
  const { data } = fields || {};
  const { datasource } = data || {};

  // Comprehensive debug logging
  console.log('=== HeroCardTest FULL DEBUG ===');
  console.log('rendering.dataSource:', props.rendering?.dataSource);
  console.log('isEditing:', isEditing);
  console.log('hasFields:', !!fields);
  console.log('hasData:', !!data);
  console.log('hasDatasource:', !!datasource);
  console.log('datasourceKeys:', datasource ? Object.keys(datasource) : 'none');
  console.log('FULL props.fields:', JSON.stringify(fields, null, 2));
  console.log('FULL datasource:', JSON.stringify(datasource, null, 2));
  console.log('=== END DEBUG ===');

  if (!datasource && !isEditing) {
    return (
      <div className={`component hero-card-test ${styles || ''}`} id={id}>
        <div style={{ padding: '20px', border: '2px solid red', background: '#fee' }}>
          <h2>Hero Card Test - NO DATASOURCE</h2>
          <p>No datasource found and not in editing mode.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`component hero-card-test ${styles || ''}`} id={id}>
      <div style={{ padding: '20px', border: '2px solid green', background: '#efe' }}>
        <h2>Hero Card Test Component (Full Width Hero Card Template)</h2>
        <p><strong>Datasource ID:</strong> {props.rendering?.dataSource || 'none'}</p>
        <p><strong>Is Editing:</strong> {isEditing ? 'Yes' : 'No'}</p>
        <p><strong>Has Datasource:</strong> {datasource ? 'Yes' : 'No'}</p>
        
        {datasource && (
          <>
            <h3>Raw Data Keys:</h3>
            <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
              {JSON.stringify(Object.keys(datasource), null, 2)}
            </pre>
            
            <h3>Full Datasource JSON:</h3>
            <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto', maxHeight: '400px' }}>
              {JSON.stringify(datasource, null, 2)}
            </pre>
            
            <h3>Field Values (if any):</h3>
            <ul style={{ textAlign: 'left' }}>
              <li>Logo: {JSON.stringify(datasource.Logo?.jsonValue)}</li>
              <li>Title: {JSON.stringify(datasource.Title?.jsonValue)}</li>
              <li>Subheading: {JSON.stringify(datasource.Subheading?.jsonValue)}</li>
            </ul>
          </>
        )}
        
        {!datasource && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            Datasource is empty! Check console for full debug output.
          </p>
        )}
      </div>
    </div>
  );
};

export default Default;
