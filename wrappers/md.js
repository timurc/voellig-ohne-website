import React from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';

export default class mdWrapper extends React.Component {
    render() {
        const post = this.props.route.page.data;
        return (
            <div className="markdown">
                <div dangerouslySetInnerHTML={{ __html: post.body }} />{' '}
                <Helmet title={`${config.siteTitle} | ${post.title}`} />
            </div>
        );
    }
}
