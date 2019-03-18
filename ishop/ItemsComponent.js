'use strict'
var Ishop = React.createClass({
    displayName:'Ishop',

    render: function() {
        var listHead = React.DOM.thead({className: 'Ishop_list_head',},
        React.DOM.tr(null,
        React.DOM.th(null,this.props.cols.name),
        React.DOM.th(null,this.props.cols.price),
        React.DOM.th(null,this.props.cols.photo),
        React.DOM.th(null,this.props.cols.quantity),)
        );
        var allItems = [];

       function buildTable(v,i,a) {
         var item =   React.DOM.tr({key: v.code, className: 'Ishop_items_item'},
        React.DOM.td({className: 'Ishop_items_item_name',}, v.name),
        React.DOM.td({className: 'Ishop_items_item_price',}, v.price),
        React.DOM.td({className: 'Ishop_items_item_photo',}, React.DOM.img({src: v.url, alt: 'picture'},)),
        React.DOM.td({className: 'Ishop_items_item_quantity',}, v.quantity),
        );
        allItems.push(item);
       };

        this.props.items.forEach(buildTable);
        
        return React.DOM.div( {className:'Ishop'}, 
          React.DOM.table( {className:'Ishop_list', },listHead,React.DOM.caption( null, this.props.shopName ), 
          React.DOM.tbody({className: 'Ishop_list_items'},allItems ),
        ),
        )
      },

})