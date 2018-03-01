# Dynamic component rendering using a json

## Installation : 

This project was bootstrapped with create-react-app
```
    npm install
    npm start
```

## Description

The trick to figure out dynamic rendering is knowing a fact that any JSX element created by React, preact or other similar libraries is basically a call to a function ```h()```,  whose closest declaration would be:

```
function h(elementName, props, children)
```

In case of react, this function is ```React.createElement```. During the transformation from JSX to JS, babel picks up the JSX, identifies the component name from the first string after '<', example 
```
<ComponentParent prop1={'prop1'}>
  <ComponentChild propa={'propa'}/>
</ComponentParent>
```

the component name is 'ComponentParent'. Then it transforms the JSX into call to React.createElemet.

There is recursive parsing for each children, and then their children, while converting all JSX to calls of React.createElement.

This is how many libraries claim to be 'compatible' with react. As they just alias the React.createElement function with a corrosponding createElement function of their own.

Now, which element gets rendered from the component's name is decided by a Map string => class or string => string.
The component names that are strings are usually the dom elements, example 'div'.
The component names that are classes, are custom elements created by that particular library.

So, for a javascript object ( converted from json ):

```
{
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
```

And a map: 

```
{
    'App': App,
    'Input': Input,
    'Divider': Divider,
    'Section': Section,
    'Header': Header,
    'Title': Title,
    'BlockText': BlockText,
    'CTA': CTA,
    'ElementGroup': ElementGroup,
    'PlainText':PlainText,
};
```

where the elements are :

```
export const App = ({className,...props}) => <main  className={classnames(className,'App')} {...props} />;

export const Input = ({className,...props}) => 
    <input {...props} className={classnames(className,'Input')} type="text"/>;

export const Divider = ({className,...props}) => <hr className={classnames(className,'Divider')} {...props} />;

export const Section = ({className,...props}) => <section className={classnames(className,'Section')} {...props}/>;

export const Header =  ({className, ...props}) => <header  className={classnames(className,'Header')} {...props}/>

export const Title = ({className,title,...props}) => <h1 className={classnames(className,'CardTitle')} {...props}>{title}</h1>;

export const BlockText = ({className, text,...props}) => <p  className={classnames(className,'BlockText')} {...props} >{text}</p>;

export const CTA = ({className,label,...props}) => <button className={classnames(className,'CTA')} {...props}>{label}</button>;

export const PlainText = i => i;

export const ElementGroup = ({className, headerText, title, blockText,ctaLabel}) => <Section className={className}>
        <Header >{headerText}</Header>
        <Title title={title}/>
        <BlockText text={blockText}/>
        <CTA label={ctaLabel}/>
</Section>

```

The output HTML that would be generated would be:


```
<main class="customAppClassName App">
  <header class="Header">
    <div>This is a text node</div>
  </header>
  <input type="text" class="Input">
  <hr class="Divider">
  <section class="element-group-class-name Section">
    <header class="Header">Element group header text</header>
    <h1 class="CardTitle">corrosponding title</h1>
    <p class="BlockText">and blockText</p>
    <button class="CTA">Here is CTA</button>
  </section>
  <div>
    <p>
      <span>Another text node</span>
    </p>
  </div>
</main>```

