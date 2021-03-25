let  DataService = (function () {
  let accessor = new WeakMap();
  let privObj = new Map();
 
  class   dataService{
    constructor () {
      accessor.set (this, privObj);
    }

    insertPair (k,v) {
      let priv = accessor.get(this);
      priv.set (k, v);
    }

    getData (q) {
      let priv = accessor.get(this);
          setTimeout(()=>{return(priv.get(q)) },1000);
    }

    getInterface () {
      return {exec:this.getData, context:this};
    }
  }
return dataService;
})();

function pr1( ){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve(1)},1000);
  });
}

function pr2 (x) {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve(2+x)},1000);
  })
}

/****************************************************************/
/*************query to a server simulate function****************/
function getGoddsInfoByID (id) {
     let lst = new Map();
     lst.set('id001',new Map([ ['medium','salt_medium.jpg'], ['big','salt_big.jpg'], ['small','salt_small.jpg'], ['title','SALT'], ['price', 1.5] ]));
     lst.set('id002',new Map([ ['medium','tomato_medium.jpg'], ['big','tomato_big.jpg'], ['small','tomato_small.jpg'], ['title','Pomodor'], ['price', 2.5] ]));
     lst.set('id003',new Map([ ['medium','bread_medium.jpg'], ['big','bread_big.jpg'], ['small','bread_small.jpg'], ['title','Bread'], ['price', 1.45] ]));
     lst.set('id004',new Map([ ['medium','milk_medium.jpg'], ['big','milk_big.jpg'], ['small','milk_small.jpg'], ['title','Milk'], ['price', 5.5] ]));

return new Promise((resolve,reject)=>{
      /*contain a map any values*/
      setTimeout(()=>{
        resolve(StaticUpdater(id,lst.get(id)));
      }, 2000);
  });
}

/**********************************
 * returns an iterator for update  a <picture> node.
 * There are two parameters in "value":
 * 1)exec() - for update a node
 * 2)key - a key of specify node inside a <picture>**
 * ************************************************/
let pictureIter = (function () {
  let privObj = {
     idOfNode: null,
     [Symbol.iterator](itemID){
       let children;
       let result;
       let index = 0;
       let tmpIndex;
       /*get a parent*/
       let node = document.querySelector('.goodsPanel');
       /*get an item*/
       node = node.querySelector('[data-good-id=' + itemID + ']');
       /*get a picture*/
       node = node.querySelector('picture');
       /*get child nodes*/
       children = node.childNodes;
       return {
         next: function () {
           
           if (index < children.length ) {
              
             let attr = children[index].getAttribute('data-items-g');
             tmpIndex = index;
             switch (attr) {
               case 'medium':
                result = {value:{ key:attr, exec:(x)=>{children[tmpIndex].setAttribute('srcset',x)} }, done:false};   
               break;
               case 'small':
                result = {value:{ key:attr, exec:(x)=>{children[tmpIndex].setAttribute('srcset',x)} }, done:false};
               break;
               case 'big':
                result = {value:{ key:attr, exec:(x)=>{children[tmpIndex].setAttribute('src', x)} }, done:false};
               break;
             }
             index++;
              return result;
           } else {
             return {value: undefined, done: true};
           }

         }
       }
     }
  }  
  let m = new WeakMap;
  
  class pictIter {
    constructor (nodeId) {
      m.set(this,privObj);
      privObj.idOfNode = nodeId;
    }

    getIter (nodeID) {
      let s = m.get(this);
      return s[Symbol.iterator](nodeID);
    }
  }
 return pictIter;
})();

/******************************
 * returns an iterator that contains
 * a key and exec- function (update a node with
 a specify key)*********This class update a <DIV> nodes inside a <LI> item*/
let itemsNodesGetter = (function () {
     let secMember = {
        [Symbol.iterator](id){
          let result;
          let children;
          let index = 0;
          let tmpIndex;
          /*get a list node*/
          let node = document.querySelector('.goodsPanel');
          /*get a concrete <li>*/
          node = node.querySelector('[data-good-id=' + id + ']');
          /*setting opacity = 1.0*/
          node.style.opacity = '';
          children = node.getElementsByTagName('div');
          return {
            next: ()=>{
              
              if (index < children.length) {
                let attr = children[index].getAttribute('data-items-g'); 
                  tmpIndex = index;
                  index++;
                switch(attr) {
                  case 'title':
                    result = {value:{key:attr, exec:(x)=>{children[tmpIndex].innerText=x;}}, done:false}; 
                  break;
                  case 'price':
                    result = {value:{key:attr, exec:(x)=>{children[tmpIndex].innerText=x;}}, done:false}; 
                  break;
                }
                return result;

              } else {
                 return {value: undefined, done:true};
              }
           }
         }
        }
     }
     let m = new WeakMap();
     class myClass {
       constructor(){
         m.set(this,secMember);
       }
       getIter(id) {
         let k = m.get(this);
         return k[Symbol.iterator](id);
       }
     }
     return myClass;
})();

/***********************************************/
/**************!!!*****OLD*************************/
let ItemsTextNodesGetter = (function () {
  /*a secret member*/
  let priv = {
    links: new Set(['medium',"small","big","title","price"]),
    [Symbol.iterator](z) {
      /* FIRSTLY  - get a UL ode,
      SECONDLY - get an li node by attribute [attr= ...]  QuerySelector()
      THIRDLY - get a specified sumitem i.e. title, price etc */
      /*get a list node*/
        let parent = document.querySelector('.goodsPanel');
        /*get a concrete item*/
        parent = parent.querySelector('[data-good-id=' + z + ']');
        if(!parent){
          return {value:null, done:true}
        }
        let iter = this.links.entries();
        let res = iter.next();
        let tmp; 
        let textNode;
        return{
            next: function () {
              if (!res.done) {
                  console.log(new Date().toTimeString());
                  tmp = res;
                  /*checking^ is there an image attributes*/
                  switch (tmp.value[0]) {
                   case 'medium':
                    textNode = parent.querySelector('[data-items-g='+tmp.value[0]+']');
                    return {value:{key:tmp.value[0], command: (x)=>{textNode.setAttribute('srcset',x)}},done:false}
                   break;
                   case 'small':
                    textNode = parent.querySelector('[data-items-g='+tmp.value[0]+']');
                    return {value:{key:tmp.value[0], command: (x)=>{textNode.setAttribute('srcset',x)}},done:false}
                   break;
                   case 'big':
                    textNode = parent.querySelector('[data-items-g='+tmp.value[0]+']');
                    return {value:{key:tmp.value[0], command: (x)=>{textNode.setAttribute('src',x)}},done:false}
                   break;
                  }
                  res = iter.next();
                  textNode = parent.querySelector('[data-items-g='+tmp.value[0]+']');
                  return {value: {id:tmp.value[0], command:(x)=>{ textNode.innerText = x}}, done: false};
              } else {
                return {value: undefined, done :true};
              }
           }
       }
    }
 }

let m = new WeakMap();
   
   class myClass {
       constructor () {
        m.set (this, priv);
       }
       getIterFieldsOfNodeByID (id) {
        let obj = m.get(this);
        return obj[Symbol.iterator](id);
       }
  }
 return myClass;

})();

/****************************************************/


let ItemsIteratorCreator = (function(){
   let m =new WeakMap();
   let privMembers = {
     [Symbol.iterator] () {
       
     }
   }
})();

/*a fabrica of <LI> nodes
 * with a specific content -
 * this content is defined 
 * into private members 
 */
const GoodsItemConstructor = (function () {
  const m = new WeakMap();
  const secretObj = new Map();

  class GoodsItem {
    constructor () {
      let tmp;
      m.set(this, secretObj);
      secretObj.set('t1', '<picture><source data-items-g="medium" srcset="');
      secretObj.set('medium_img', 'undefined_medium.svg');
      tmp = '" media="(min-width: 365px)' +
       ' and (max-width: 800px)"><source data-items-g="small" srcset="';
      secretObj.set('t2', tmp);
      secretObj.set('small_img', 'undefined_small.svg');
      tmp = '" media=" (max-width: 364px)"><img data-items-g="big" src="';
      secretObj.set('t3', tmp);
      secretObj.set('big_img', 'undefined_big.svg');
      tmp = '" alt="MDN">' +
       '</picture>' + '<div class="title" data-items-g="title">';
      secretObj.set('t4', tmp);
      secretObj.set('title', 'TEMPLATE');
      tmp = '</div><div class="price" data-items-g="price">';
      secretObj.set('t5', tmp);
      secretObj.set('price', '$0.00');
      secretObj.set('t6', '</div>');
    }

    makeItem (id = 'id001') {
      let tmpl = '';
      let iter;
      let result;
      try {
        if (!id) {
          throw new Error('Bad ID!');
        }
      } catch (x) {
        console.log(x);
      }
      /* copy a map */
      const obj = new Map(m.get(this));
      const elemForInsert = document.createElement('li');
      /*make aa element semitransparent*/
      elemForInsert.style.opacity = 0.3;
      /* create an element */
      elemForInsert.setAttribute('class', 'goodsItem');
      
      /* assemble a string */
      iter = obj.values();
      result = iter.next();
      while (!result.done) {
        tmpl += result.value;
        result = iter.next();
      }
      /* convert a text to a node and insert it */
      elemForInsert.insertAdjacentHTML('afterbegin', tmpl);
      elemForInsert.setAttribute('data-good-id', id);
      return elemForInsert;
    }
  }

  return GoodsItem;
})();


/**********a StaticUpdater - function*************/
 let StaticUpdater =  (key,myMap)=>{
  let result;
  let tmp;
  let fieldsUpdater = new itemsNodesGetter();
  let pictureUpdater = new pictureIter();
  /*get iterators*/
  let iter = pictureUpdater.getIter(key);
  /*if a node isn`t exists*/
    if(!iter) {
      return null;
    }
  /*processing of a picture iterator*/
  /*1)init*/
   result =  iter.next();
   while (!result.done) {
     /*2)get a key*/
     tmp = myMap.get(result.value.key);
     /*3)assign a value*/
     result.value.exec(tmp);
     /*4) get a new result*/
     result =  iter.next();
   }
   iter = fieldsUpdater.getIter(key);
   /*processing of a text"div" iterator*/
  /*1)init*/
  result =  iter.next();
  while (!result.done) {
    /*2)get a key*/
    tmp = myMap.get(result.value.key);
    /*3)assign a value*/
    result.value.exec(tmp);
     /*4) get a new result*/
     result =  iter.next();

  }
  iter = fieldsUpdater.getIter(key);
}






/*this class contains 
an instance of fabrica. It can  
add/remove an item from an <UL>
node. It also bind/unbind 
an event listener*/
let ListMgr = (function(){

 let m = new WeakMap();
 
 let hideObj = {
   listOfID: new Set(),
   fabrica: new GoodsItemConstructor(),
   insertItem: (node, listener)=>{
     let parent = document.querySelector('.goodsPanel');
     let newAttr = node.getAttribute ('data-good-id');
        /* embed a node into the DOM*/
        parent.appendChild (node);
        /*bind to an event listener*/
        node.addEventListener ('click', listener, false);
   },

   removeItem: (id, listener)=>{
    let node =ListMgr.getNodeByID (id);
      /*unbind to an event listener*/
       node.removeEventListener('click', listener);
       /*othervise - remove a node from the DOM*/
       node.parentElement.removeChild(node);
   },

   updateItem: (id, mapData)=>{
    let node = ListMgr.getNodeByID (id);
  
   }

  }

  class ListMgr  {
     constructor (subscriber, serviceInterface) {
        /*init a weakMap for access to private members*/
        m.set(this, hideObj);
       /*on click handler*/ 
       this.subscriber = subscriber;
       /*a service interface  to query an info about goods*/
       this.serviceInterface = serviceInterface;
     }

     static getNodeByID (id) {
      let parent = document.querySelector ('.goodsPanel');
      return parent.querySelector ('[data-good-id="' + id + '"]');
     }
     
     isInDOM (id) {
      let parent = document.querySelector('.goodsPanel');
      return parent.querySelector('[data-good-id="'+ id +'"]') ? true : false;
     }

     insertNode (idOfNode) {
       let privObj = m.get(this);
        /*checking - is a noode in DOM?*/
        if (this.isInDOM(idOfNode)) {
          return -1;
        } else {
          /*insert a key in a set*/
          privObj.listOfID.add(idOfNode);
          /*create a new node*/
          let newNode = privObj.fabrica.makeItem(idOfNode);
          /*insert into DOM*/
          privObj.insertItem(newNode, this.subscriber);
        } 
     }

     removeNode (idOfNode) {
      let privObj = m.get(this);
      /*checking - is a noode in DOM?*/
      if (!this.isInDOM(idOfNode)) {
        return -1;
      } else {
         /*remove a key from a set*/
         privObj.listOfID.delete(idOfNode);
        /*remove from DOM*/
        privObj.removeItem(idOfNode, this.subscriber);
      } 
     }

  }
return ListMgr;

})();


/*******************************
 * the method -getUpdateHandler()
 * returns an handler for updating
 * existing nodes inside <UL>.It can
 * be updated by an asyncrone callback 
 *******FOR callbacks*************/
 let ItemsUpdater = (function(){
  let m = new WeakMap();
  let privObj = {
    updater: function (key,myMap) {
        let result;
        let tmp;
        let fieldsUpdater = new itemsNodesGetter();
        let pictureUpdater = new pictureIter();
        /*get iterators*/
        let iter = pictureUpdater.getIter(key);
        /*if a node isn`t exists*/
          if(!iter) {
            return null;
          }
        /*processing of a picture iterator*/
        /*1)init*/
         result =  iter.next();
         while (!result.done) {
           /*2)get a key*/
           tmp = myMap.get(result.value.key);
           /*3)assign a value*/
           result.value.exec(tmp);
           /*4) get a new result*/
           result =  iter.next();
         }
         iter = fieldsUpdater.getIter(key);
         /*processing of a text"div" iterator*/
        /*1)init*/
        result =  iter.next();
        while (!result.done) {
          /*2)get a key*/
          tmp = myMap.get(result.value.key);
          /*3)assign a value*/
          result.value.exec(tmp);
           /*4) get a new result*/
           result =  iter.next();

        }
        iter = fieldsUpdater.getIter(key);
    }
  } 


  class Updater {
    constructor () {
      m.set(this,privObj);  
    }

    getUpdateHandler () {
      let q = m.get(this);
      return q.updater;
    }
  }
  return Updater;

})();



function Ext01 () {
  let obj = {};
  return {
    insertPair: function (k,v){
      obj[k]=v;
    },
    getData: function (k) {
      return obj[k];
    }
  }
}

class myClass {
  constructor(x){
    this.method = x;
  }
  run (id) {
   console.log(this.method(id));
  }
}

function onClick (evt) {
  alert(new Date().toLocaleTimeString());
  console.log(evt.currentTarget.getAttribute('data-good-id'));
}

window.onload = function () {
  let dService1 = new  DataService();
  dService1.insertPair('id001',new Map([['price',10.5],['title','Bread']]));
  dService1.insertPair('id002',new Map([['price',15.0],['title','Baton']]));
// let z001 = new myClass(dService1.getInterface());
 //z001.run('id001');
  const container = document.querySelector('.goodsPanel');
  /* let template  = '<source srcset="' + 'bread_medium.jpg' + '" media="(min-width: 365px)'+
       ' and (max-width: 800px)">'+
       ' <source srcset="'+'bread_small.jpg'+'" media=" (max-width: 364px)">'+
       ' <img src="'+'bread_big.jpg'+'" alt="MDN">'+
        '</picture>'+
     '<div class="title">'+'TEMPLATE'+'</div>'+
     '<div class="price">'+'$00.0'+'</div>'; */
  let iter;
  let result;
  let mgr = new ListMgr(onClick, dService1.getInterface());
  mgr.insertNode('id001');
  mgr.insertNode('id002');
  mgr.insertNode('id003');
  mgr.insertNode('id004');
  
  let x001 = getGoddsInfoByID('id001');
 x001.then( getGoddsInfoByID.bind(null,'id002') )
  .then( getGoddsInfoByID.bind(null,'id003'))
  .then( getGoddsInfoByID.bind(null,'id004'))
  .catch();
 
};
