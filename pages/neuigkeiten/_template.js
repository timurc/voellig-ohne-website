import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import sternchen from 'pages/sternchen.svg'
import Header from 'pages/components/_header.js'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Image from 'pages/components/_responsive-image-neuigkeiten.js'

import './neuigkeiten.less'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },

    render () {

        let newsIntro
        const galleryImages = []

        const currentPath = '/neuigkeiten/'

        const news = this.props.route.pages.filter((page) => {
            return page.path.substr(0, currentPath.length) === currentPath && page.path !== currentPath
        }).sort((a, b) => {
            return a.data.date > b.data.date
        })

        if (this.props.location.pathname === currentPath) {
            const newsItems = []

            news.forEach((page) => {
                let mainImage

                if (page.data.mainImage) {
                    mainImage = (
                        <Image location={page.path} source={page.data.mainImage} className="vo_news-main_image"/>
                    )
                }

                newsItems.push(
                    <Link to={prefixLink(page.path)}
                            key={page.path}
                            className="vo_news-link vo-section vo-section--half vo_news-item">
                        <section>
                            <span class="vo_news-date">
                                {formatDate(page.data.date)}
                            </span>
                            <h1>{page.data.title}</h1>
                            {mainImage}
                        </section>
                    </Link>
                )
            })

            newsIntro = (
                <div className="vo-section_wrapper vo_news-wrapper">
                    {this.props.children}
                    {newsItems}
                </div>
            )
        } else {
            const page = news.find((page) => {
                return page.path === this.props.location.pathname
            })

            let gallery

            if (page.data.images) {
                gallery = page.data.images.map((image) => {
                    return (
                        <li key={image}>
                            <Image location={page.path} source={image} />
                        </li>
                    )
                })
            }

            newsIntro = (
                <div>
                    <div className="vo-section_wrapper">
                        <section className="vo-section">
                            <span class="vo_news-date">
                                {formatDate(page.data.date)}
                            </span>
                            <h1>
                                {page.data.title}
                            </h1>
                            {this.props.children}
                        </section>
                    </div>

                    <ul className='vo_news-gallery'>
                        {gallery}
                    </ul>
                </div>
            )
        }


        return (
            <DocumentTitle title={`${config.siteTitle} | projekte`}>
                {newsIntro}
            </DocumentTitle>
        )
    },
})

function formatDate(date) {
    const parsedDate = new Date(date)
    return parsedDate.getDate() + '.' + (parsedDate.getMonth() + 1) + '.' + parsedDate.getFullYear()
}