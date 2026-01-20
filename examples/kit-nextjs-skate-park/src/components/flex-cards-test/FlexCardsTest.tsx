import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Icon1?: { jsonValue?: unknown };
  Title1?: { jsonValue?: unknown };
  Copy1?: { jsonValue?: unknown };
  Link1?: { jsonValue?: unknown };
  Icon2?: { jsonValue?: unknown };
  Title2?: { jsonValue?: unknown };
  Copy2?: { jsonValue?: unknown };
  Link2?: { jsonValue?: unknown };
  Icon3?: { jsonValue?: unknown };
  Title3?: { jsonValue?: unknown };
  Copy3?: { jsonValue?: unknown };
  Link3?: { jsonValue?: unknown };
  Icon4?: { jsonValue?: unknown };
  Title4?: { jsonValue?: unknown };
  Copy4?: { jsonValue?: unknown };
  Link4?: { jsonValue?: unknown };
}

type FlexCardsTestProps = ComponentProps & {
  fields: {
    data?: {
      datasource?: Fields;
    };
  };
};

const Default = (props: FlexCardsTestProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  // Safe destructuring with fallbacks
  const { data } = fields || {};
  const { datasource } = data || {};

  // Comprehensive debug logging
  console.log('=== FlexCardsTest FULL DEBUG ===');
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
      <div className={`component flex-cards-test ${styles || ''}`} id={id}>
        <div style={{ padding: '20px', border: '2px solid red', background: '#fee' }}>
          <h2>Flex Cards Test - NO DATASOURCE</h2>
          <p>No datasource found and not in editing mode.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`component flex-cards-test ${styles || ''}`} id={id}>
      <div style={{ padding: '20px', border: '2px solid blue', background: '#eff' }}>
        <h2>Flex Cards Test Component</h2>
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
            
            <h3>ALL CARDS (1-4 Together):</h3>
            <h4>Card 1:</h4>
            <ul style={{ textAlign: 'left' }}>
              <li><strong>Icon1:</strong> {JSON.stringify(datasource.Icon1?.jsonValue)}</li>
              <li><strong>Title1:</strong> {JSON.stringify(datasource.Title1?.jsonValue)}</li>
              <li><strong>Copy1:</strong> {JSON.stringify(datasource.Copy1?.jsonValue)}</li>
              <li><strong>Link1:</strong> {JSON.stringify(datasource.Link1?.jsonValue)}</li>
            </ul>
            <h4>Card 2:</h4>
            <ul style={{ textAlign: 'left' }}>
              <li><strong>Icon2:</strong> {JSON.stringify(datasource.Icon2?.jsonValue)}</li>
              <li><strong>Title2:</strong> {JSON.stringify(datasource.Title2?.jsonValue)}</li>
              <li><strong>Copy2:</strong> {JSON.stringify(datasource.Copy2?.jsonValue)}</li>
              <li><strong>Link2:</strong> {JSON.stringify(datasource.Link2?.jsonValue)}</li>
            </ul>
            <h4>Card 3:</h4>
            <ul style={{ textAlign: 'left' }}>
              <li><strong>Icon3:</strong> {JSON.stringify(datasource.Icon3?.jsonValue)}</li>
              <li><strong>Title3:</strong> {JSON.stringify(datasource.Title3?.jsonValue)}</li>
              <li><strong>Copy3:</strong> {JSON.stringify(datasource.Copy3?.jsonValue)}</li>
              <li><strong>Link3:</strong> {JSON.stringify(datasource.Link3?.jsonValue)}</li>
            </ul>
            <h4>Card 4:</h4>
            <ul style={{ textAlign: 'left' }}>
              <li><strong>Icon4:</strong> {JSON.stringify(datasource.Icon4?.jsonValue)}</li>
              <li><strong>Title4:</strong> {JSON.stringify(datasource.Title4?.jsonValue)}</li>
              <li><strong>Copy4:</strong> {JSON.stringify(datasource.Copy4?.jsonValue)}</li>
              <li><strong>Link4:</strong> {JSON.stringify(datasource.Link4?.jsonValue)}</li>
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
