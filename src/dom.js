window.dom = {
    //增
    create(string) {
        //const wrapper = document.createElement('div'); 不能添加td
        const wrapper = document.createElement("template")
        wrapper.innerHTML = string.trim();
        return wrapper.content.firstChild;
    },
    after(node, newNode) {
        node.parentNode.insertBefore(newNode, node.nextSibling)
    },
    before(node, newNode) {
        node.parentNode.insertBefore(newNode, node)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(parent, node) {
        // node.parentNode.appendChild(parent);
        // parent.appendChild(node);
        dom.before(node, parent);
        dom.append(parent, node)
    },
    //删
    remove(node) {
        //node.remove(); ie 不兼容
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array

        //方法2
        // const array = []
        // const length = node.childNodes.length
        // for(let i = 0; i < length; i ++){
        //     if(!node.childNodes[i]){
        //         return array
        //     }
        //     array.push(dom.remove(node.childNodes[i]))
        //     i = i - 1;
        // }

    },
    //改
    attr(node, name, value) { //重载
        //可读可写
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }

    },
    text(node, string) { //适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }

    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(sty,'background','pink')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(sty,'background')
                return node.style[name]
            } else if (name instanceof Object) {
                // dom.style(sty,{border:'1px solid yellow'})
                const object = name
                for (let prop in object) {
                    node.style[prop] = object[prop]
                }
            }
        }
    },
    class:{
        add(node,name){
            node.classList.add(name)
        },
        remove(node,name){
            node.classList.remove(name)
        },
        has(node,name){
            return node.classList.contains(name)
        }
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    //查
    find(name,scope){
        return (scope || document) .querySelectorAll(name)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){
        return Array.from(node.parentNode.children)
        .filter(n => n !== node)
    },
    next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    previous(node){
        let x = node.previousSibling
        while(x&&x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },
    each(nodeList,fn){
        for(let i=0; i<nodeList.length; i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        const list = node.parentNode.children
        let i
        for(i=0; i<list.length; i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }

}