import React from 'react';
import classnames from 'classnames';

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
