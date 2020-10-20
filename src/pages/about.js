import React from 'react'
import { Layout } from '../components/common'

const About = () => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <h1 className="content-title">About</h1>
                <section className="content-body">
                    We're Miranda and Fernanda and ~we were roommates~ when we met and fell in love!
                    During our second year of college, we got really into cooking since we finally had 
                    our own kitchen in our on-campus apartment. This website will contain all of our favorite
                    recipes for us to constantly refer back to and maybe inspire some of you to cook these delicious
                    treats as well! 
                    <br></br> 
                    Hope you enjoy!
                </section>
            </article>
        </div>
    </Layout>
)

export default About
