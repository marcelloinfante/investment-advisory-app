import clsx from 'clsx'
import {KTSVG} from '../../../helpers'
import {HeaderUserMenu} from '../../../partials'

const itemClass = 'ms-1 ms-lg-3'
const userAvatarClass = 'symbol-35px symbol-md-40px'
const btnIconClass = 'svg-icon-1'

const Navbar = () => {
  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <div className='btn btn-icon btn-active-color-primary w-35px h-35px' />
          <KTSVG path='/media/icons/duotune/text/txt001.svg' className={btnIconClass} />
        </div>
        <HeaderUserMenu />
      </div>
    </div>
  )
}

export {Navbar}
