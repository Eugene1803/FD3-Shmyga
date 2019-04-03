'use strict'
var IshopComponent = React.createClass({
    displayName:'IshopComponent',
    getInitialState: function() {
      return { 
        chosenItemCode: null,
        deletedItemCode: [],
      };
    },
    chooseItem: function(code){
      this.setState({chosenItemCode: code });
    }
    ,
    deleteItems: function(code){
      var confirmation = confirm('Вы уверены, что хотите удалить товар?');
      if(confirmation){
      this.state.deletedItemCode.push(code);
      this.setState({deletedItemCode: this.state.deletedItemCode});
      }
    }
    ,
    displayedItems: null,
    showItems: function(){
      this.displayedItems = [];
      this.props.itemsList.forEach(v => {
        if(this.state.deletedItemCode.indexOf(v.code) == -1){
          this.displayedItems.push(v);
        }
      })
    },
    render: function() {
        var tableHead = React.DOM.thead({className: 'IshopTableHead',},
        React.DOM.tr(null,
        React.DOM.th(null,this.props.cols.name),
        React.DOM.th(null,this.props.cols.price),
        React.DOM.th(null,this.props.cols.photo),
        React.DOM.th(null,this.props.cols.quantity),
        React.DOM.th(null,this.props.cols.control)
        ));
        this.showItems();
        var allItems =  this.displayedItems.map(v => 
            React.createElement(ItemComponent,{key: v.code,currItem: v,chosen: (this.state.chosenItemCode === v.code)?true:false, cbChooseItem: this.chooseItem,cbDeleteItem: this.deleteItems})
          
        ) 
        return React.DOM.div( {className:'Ishop'}, 
          React.DOM.table( {className:'IshopTable', },tableHead,React.DOM.caption( null, this.props.shopName ),
          React.DOM.tbody(null,allItems),
        ),
        )
      },

})