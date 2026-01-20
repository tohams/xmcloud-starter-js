import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

interface Fields {
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
            
            <h3>Card 4 ONLY (Testing in Isolation):</h3>
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
