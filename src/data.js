export default {
    type: 'App',
    props: {
        className: 'customAppClassName',
    },
    children: [
        {
            type: 'Header',
            children: [
                {
                    type: 'div',
                    children: 'This is a text node',
                }
            ]
        },
        {
            type:'Input',
        },
        {
            type: 'Divider',
        },
        {
            type: 'ElementGroup',
            props: {
                className:'element-group-class-name', 
                headerText:'Element group header text', 
                title:'corrosponding title', 
                blockText:'and blockText',
                ctaLabel:'Here is CTA'
            }
        },
        {
            type:'div',
            children: [
                {
                    type:'p',
                    children:[
                        {
                            type:'span',
                            children:'Another text node',
                        }
                    ]
                }
            ]
        }

    ]
}