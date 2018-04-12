import React from 'react'
import Link from 'gatsby-link'

const NotFoundPage = () => (
  <div className="mv3 mv5-ns tc">
    <h1 className="f2">Đường dẫn không tồn tại :(</h1>
    <p className="lh-copy f5">
      Hikerlust đang trong quá trình chuyển đổi sang hệ thống mới nên có thể đường dẫn cũ không còn hoạt động nữa.
    </p>
    <p className="lh-copy f5">
      Bạn vui lòng kiểm tra lại hoặc sử dụng chức năng
      <Link to="/search" className="mh1 ba b--gold pv2 ph3">
        Tìm Kiếm
      </Link>
      trên website.
    </p>
  </div>
)

export default NotFoundPage
