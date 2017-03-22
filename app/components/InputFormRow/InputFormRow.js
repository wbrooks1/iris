'use strict';

import React, {Component} from 'react';
import SingleLineInput from '../SingleLineInput';
import MultiLineInput from '../MultiLineInput';
import DateInput from '../DateInput';
import LocationInput from '../LocationInput';
import DropDownInput from '../DropDownInput';

/**
 * Form input row component renders correct form input component for row.
 * @author Winfield Brooks
 * @props rowData: row / component data
 * @props isEdit: boolean, true if editing an incident
 * @props location: user default location if new incident or report, existing location if editing incident
 * @props updateInput: method to update form input (NewIncident.updateFormInput, NewReport.updateFormInput, EditIncident.updateFormInput
 */
export default class InputFormRow extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render input component based on rowData.type, return null if no type found.
     * @returns {input component to render}
     */
    render() {
        var rowData = this.props.rowData;
        if (rowData.type) {
            if (rowData.type === "text") {
                return (
                    <SingleLineInput title={rowData.title}
                                     type={rowData.type}
                                     data={rowData.data}
                                     placeholder={'Enter incident ' + rowData.title}
                                     updateInput={(data, id, title, type) => this.props.updateInput(data, id, title, type)}
                                     id={rowData.id}
                                     isEdit={this.props.isEdit}
                    />            );
            } else if (rowData.type === "multi_text") {
                return (
                    <MultiLineInput title={rowData.title}
                                    type={rowData.type}
                                    data={rowData.data}
                                    placeholder={'Enter incident ' + rowData.title}
                                    updateInput={(data, id, title, type) => this.props.updateInput(data, id, title, type)}
                                    id={rowData.id}
                                    isEdit={this.props.isEdit}
                    />
                );
            } else if (rowData.type === 'date') {
                return (
                    <DateInput title={rowData.title}
                               type={rowData.type}
                               updateInput={(data, id, title, type) => this.props.updateInput(data, id, title, type)}
                               id={rowData.id}
                               date={rowData.data}
                    />
                )
            } else if (rowData.type === 'location') {
                return (
                    <LocationInput title={rowData.title}
                                   type={rowData.type}
                                   updateInput={(data, id, title, type) => this.props.updateInput(data, id, title, type)}
                                   id={rowData.id}
                                   navigator={this.props.navigator}
                                   location={this.props.location}
                                   isEdit={this.props.isEdit}
                    />
                )
            }
            else if (rowData.type === 'drop') {
                return (
                    <DropDownInput title={rowData.title}
                                   type={rowData.type}
                                   updateInput={(data, id, title, type) => this.props.updateInput(data, id, title, type)}
                                   id={rowData.id}
                                   navigator={this.props.navigator}
                    />
                )
            }
        }else {
            return null;
        }
    }
}