import React from 'react'

import TagCloud from './TagCloud'

export default function(props) {
  return (
    <div>
      <section className="mb4">
        <header className="tc pv3 ba b--gold gold fw6 f6 ttu tracked">Về Na</header>
        <main className="lh-copy">
          <p className="mv3 tc">
            <img
              src="https://res.cloudinary.com/hikerlust/image/upload/v1520282891/Untitled-1_1_am6mkt.png"
              alt="Na"
              className="mw5"
            />
          </p>
          Tôi là một cô gái hay đi và Hikerlust là nơi ghi lại những chuyến đi của tôi &lt;3
        </main>
      </section>

      <section className="mb4">
        <header className="tc pv3 ba b--gold gold fw6 f6 ttu tracked">Theo dõi Na</header>
        <main className="lh-copy tc pt3">
          <a href={props.socials.facebookUrl} className="mh2 f3">
            <i className="fa fa-facebook-square" />
          </a>
          <a href={props.socials.instagramUrl} className="mh2 f3">
            <i className="fa fa-instagram" />
          </a>
          <a href={props.socials.pinterestUrl} className="mh2 f3">
            <i className="fa fa-pinterest-square" />
          </a>
          <a href={props.socials.linkedInUrl} className="mh2 f3">
            <i className="fa fa-linkedin-square" />
          </a>
        </main>
      </section>

      <section className="mb4">
        <header className="tc pv3 ba b--gold gold fw6 f6 ttu tracked">Tags</header>
        <main className="lh-copy tc pv3">
          <TagCloud tags={props.tags} />
        </main>
      </section>
    </div>
  )
}
