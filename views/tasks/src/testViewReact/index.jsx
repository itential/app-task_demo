import React from 'react';

export const Body = ({ task = {}, state, setState, finish, cancel, onError }) => {
  // Add a default empty object for task.variables and task.variables.incoming
  const variables = task?.variables || {};
  const incoming = variables.incoming || {};
  const { header, body, btn_success, btn_failure } = incoming;

  return (
    <div className="dialog">
      <div className="dialog-content">
        <pre style={{ margin: '20px 5px 5px 10px' }}>{body}</pre>
      </div>
    </div>
  );
};


export const Footer = ({ task = {}, state, setState, finish, cancel, onError }) => {
  // Add a default empty object for task.variables and task.variables.incoming
  const variables = task?.variables || {};
  const incoming = variables.incoming || {};
  const { btn_success = 'Success', btn_failure } = incoming;

  const handleAccept = () => {
    finish({ finish_state: 'success', variables: state });
  };

  const handleReject = () => {
    finish({ finish_state: 'failure', variables: state });
  };

  return (
    <>
      <div style={{ marginRight: '12px' }}>
        <button className="primary-button" onClick={cancel}>Cancel</button>
        {btn_failure && (<button className="primary-button" onClick={handleReject}>{btn_failure}</button>)}
        <button className="primary-button" onClick={handleAccept}>{btn_success}</button>
      </div>
    </>
  );
};

export const Header = ({ task = {}, state }) => {
  // Add a default empty object for task.variables and task.variables.incoming
  const variables = task?.variables || {};
  const incoming = variables.incoming || {};
  const { header = 'Test View React' } = incoming;
  return <span>{header}</span>;
};