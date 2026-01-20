import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Icon1?: unknown;
  Title1?: unknown;
  Copy1?: unknown;
  Link1?: unknown;
  Icon2?: unknown;
  Title2?: unknown;
  Copy2?: unknown;
  Link2?: unknown;
  Icon3?: unknown;
  Title3?: unknown;
  Copy3?: unknown;
  Link3?: unknown;
  Icon4?: unknown;
  Title4?: unknown;
  Copy4?: unknown;
  Link4?: unknown;
}

type FlexCardsTestProps = ComponentProps & {
  fields: Fields;
};

const Default = (props: FlexCardsTestProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const { page } = props;
  const { isEditing } = page.mode;

  // With default JSS shaping, fields come directly (not nested in data.datasource)
  const hasAnyField = !!(
    fields.Icon1 || fields.Title1 || fields.Copy1 || fields.Link1 ||
    fields.Icon2 || fields.Title2 || fields.Copy2 || fields.Link2 ||
    fields.Icon3 || fields.Title3 || fields.Copy3 || fields.Link3 ||
    fields.Icon4 || fields.Title4 || fields.Copy4 || fields.Link4
  );

  // Comprehensive debug logging
  console.log('=== FlexCardsTest FULL DEBUG (Default JSS) ===');
  console.log('rendering.dataSource:', props.rendering?.dataSource);
  console.log('isEditing:', isEditing);
  console.log('hasFields:', !!fields);
  console.log('hasAnyField:', hasAnyField);
  console.log('fieldsKeys:', fields ? Object.keys(fields) : 'none');
  console.log('FULL props.fields:', JSON.stringify(fields, null, 2));
  console.log('=== END DEBUG ===');

  if (!hasAnyField && !isEditing) {
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
        <p><strong>Has Any Field:</strong> {hasAnyField ? 'Yes' : 'No'}</p>
        
        {hasAnyField && (
          <>
            <h3>Raw Data Keys:</h3>
            <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
              {JSON.stringify(Object.keys(fields), null, 2)}
            </pre>
            
            <h3>Full Fields JSON:</h3>
            <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto', maxHeight: '400px' }}>
              {JSON.stringify(fields, null, 2)}
            </pre>
            
            <h3>ALL CARDS (Testing Default JSS Shaping - No Custom Query):</h3>
            <h4>Card 1:</h4>
            <ul style={{ textAlign: 'left' }}>
              <li><strong>Icon1:</strong> {JSON.stringify(fields.Icon1)}</li>
              <li><strong>Title1:</strong> {JSON.stringify(fields.Title1)}</li>
              <li><strong>Copy1:</strong> {JSON.stringify(fields.Copy1)}</li>
              <li><strong>Link1:</strong> {JSON.stringify(fields.Link1)}</li>
            </ul>
            <h4>Card 2:</h4>
            <ul style={{ textAlign: 'left' }}>
              <li><strong>Icon2:</strong> {JSON.stringify(fields.Icon2)}</li>
              <li><strong>Title2:</strong> {JSON.stringify(fields.Title2)}</li>
              <li><strong>Copy2:</strong> {JSON.stringify(fields.Copy2)}</li>
              <li><strong>Link2:</strong> {JSON.stringify(fields.Link2)}</li>
            </ul>
            <h4>Card 3:</h4>
            <ul style={{ textAlign: 'left' }}>
              <li><strong>Icon3:</strong> {JSON.stringify(fields.Icon3)}</li>
              <li><strong>Title3:</strong> {JSON.stringify(fields.Title3)}</li>
              <li><strong>Copy3:</strong> {JSON.stringify(fields.Copy3)}</li>
              <li><strong>Link3:</strong> {JSON.stringify(fields.Link3)}</li>
            </ul>
            <h4>Card 4:</h4>
            <ul style={{ textAlign: 'left' }}>
              <li><strong>Icon4:</strong> {JSON.stringify(fields.Icon4)}</li>
              <li><strong>Title4:</strong> {JSON.stringify(fields.Title4)}</li>
              <li><strong>Copy4:</strong> {JSON.stringify(fields.Copy4)}</li>
              <li><strong>Link4:</strong> {JSON.stringify(fields.Link4)}</li>
            </ul>
          </>
        )}
        
        {!hasAnyField && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            No fields found! Check console for full debug output.
          </p>
        )}
      </div>
    </div>
  );
};

export default Default;
