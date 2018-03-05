import React from 'react'

import TagCloud from './TagCloud'

export default function(props) {
  return (
    <div>
      <section className="mb4">
        <header className="tc pv3 ba b--silver f6 ttu tracked">Về Na</header>
        <main className="lh-copy">
          <p className="mv3 tc">
            <img src="https://hikerlust.com/wp-content/uploads/2018/02/Untitled-1.png" alt="" className="mw5" />
          </p>
          Tôi là một cô gái hay đi và Hikerlust là nơi ghi lại những chuyến đi của tôi &lt;3
        </main>
      </section>

      <section className="mb4">
        <header className="tc pv3 ba b--silver f6 ttu tracked">Theo dõi Na</header>
        <main className="lh-copy tc pv3">
          <a href="" className="mh2 f3">
            <i className="fa fa-facebook-square" />
          </a>
          <a href="" className="mh2 f3">
            <i className="fa fa-instagram" />
          </a>
          <a href="" className="mh2 f3">
            <i className="fa fa-pinterest-square" />
          </a>
          <a href="" className="mh2 f3">
            <i className="fa fa-twitter-square" />
          </a>
        </main>
      </section>

      <section className="mb4">
        <header className="tc pv3 ba b--silver f6 ttu tracked">Tags</header>
        <main className="lh-copy tc pv3">
          <TagCloud tags={props.tags} />
        </main>
      </section>
    </div>
  )
}
