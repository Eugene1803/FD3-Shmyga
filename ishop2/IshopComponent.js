'use strict'
var IshopComponent = React.createClass({
    displayName:'IshopComponent',
    getInitialState: function() {
      return { 
        chosenItemCode: null,
        displayedItems: this.props.itemsList.slice(0),
      };
    },
    chooseItem: function(code){
      this.setState({chosenItemCode: code });
    }
    ,
    deleteItems: function(code){
      var confirmation = confirm('Вы уверены, что хотите удалить товар?');
      if(confirmation){
      var displayedItems = this.state.displayedItems.filter(v => (v.code !== code));
      this.setState({displayedItems: displayedItems});
      }
    }
    ,
    render: function() {
        var tableHead = React.DOM.thead({className: 'IshopTableHead',},
        React.DOM.tr(null,
        React.DOM.th(null,this.props.cols.name),
        React.DOM.th(null,this.props.cols.price),
        React.DOM.th(null,this.props.cols.photo),
        React.DOM.th(null,this.props.cols.quantity),
        React.DOM.th(null,this.props.cols.control)
        ));
        var allItems =  this.state.displayedItems.map(v => 
            React.createElement(ItemComponent,{key: v.code,currItem: v,chosen: (this.state.chosenItemCode === v.code)?true:false, cbChooseItem: this.chooseItem,cbDeleteItem: this.deleteItems})
          
        ) 
        return React.DOM.div( {className:'Ishop'}, 
          React.DOM.table( {className:'IshopTable', },tableHead,React.DOM.caption( null, this.props.shopName ),
          React.DOM.tbody(null,allItems),
        ),
        )
      },

})