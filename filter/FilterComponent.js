'use strict'
var FilterComponent = React.createClass({
    displayName:'FilterComponent',
    getInitialState: function(){
        return {
            inputTextValue: this.props.defaultInputTextValue,
            checkboxChecked: this.props.defaultCheckboxChecked,
        };
    },
    clickCheckbox: function (EO){
        this.setState({checkboxChecked: EO.target.checked});
    },
    changeInputTextValue: function(EO){
        this.setState({inputTextValue: EO.target.value});
    },
    setDefault: function(){
        this.setState({inputTextValue: this.props.defaultInputTextValue,
            checkboxChecked: this.props.defaultCheckboxChecked,});
    },
    render: function(){
        var targetStringsArray = [];
        function compare(a,b) {
            if ( a.value<b.value )  return -1;
            if ( a.value>b.value )  return 1;
            return 0;
            
        };
        this.props.strings.forEach((v,i) => {
            targetStringsArray.push({key: i, value: v}); 
        }
        );
        if(this.state.checkboxChecked){
            targetStringsArray.sort(compare);
        };
        targetStringsArray = targetStringsArray.map(v => {
            if(v.value.indexOf(this.state.inputTextValue) != -1 ){
              return React.DOM.div({key: v.key},v.value);
            }
         }
        );   
        return React.DOM.div({className:'FilterComponentContainer'},
        React.DOM.input({type: 'checkbox',/*defaultChecked: this.state.checkboxChecked,*/checked:this.state.checkboxChecked, onClick: this.clickCheckbox}),
        React.DOM.input({type:'text',/*defaultValue: this.state.inputTextValue,*/ value:this.state.inputTextValue, onChange: this.changeInputTextValue}),
        React.DOM.button({onClick: this.setDefault},'сброс'),
        React.DOM.div({className: 'FilterComponentContainerList'},targetStringsArray)
        )
    }
})