import React, { ChangeEvent } from 'react';
// import styles from './ProfileStatus.module.css';
// import { findAllByDisplayValue } from '@testing-library/react';

// --- typing
type PropType = {
  status: string;
  updateStatus: (status: string) => void;
};
type StateType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<PropType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.target.value,
    });
  };

  componentDidUpdate(prevProps: PropType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
    // let a = this.state;
    // let b = this.props;
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || '------'}</span>
          </div>
        )}

        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              value={this.state.status}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
