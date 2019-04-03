'use strict'
var ItemComponent = React.createClass({
    displayName: 'ItemComponent',

    chooseMe: function(){
        this.props.cbChooseItem(this.props.currItem.code);
        
    }
    ,
    deleteMe: function(EO){
        EO.stopPropagation();
        this.props.cbDeleteItem(this.props.currItem.code);
    },
    render: function(){
        return React.DOM.tr({className:this.props.chosen?'ItemComponentTrChosen': 'ItemComponentTr', onClick: this.chooseMe},
            React.DOM.td(null,this.props.currItem.name),
            React.DOM.td(null,this.props.currItem.price),
            React.DOM.td(null,React.DOM.img({src: this.props.currItem.url})),
            React.DOM.td(null,this.props.currItem.quantity),
            React.DOM.td(null,React.DOM.button({onClick: this.deleteMe},this.props.currItem.control))    
        )
    }
    
})