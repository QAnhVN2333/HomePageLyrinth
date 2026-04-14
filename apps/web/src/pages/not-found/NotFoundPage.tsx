import { Link } from 'react-router-dom'
import {Icon} from '../../features/util/components/util';
export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <article className="card" role={"alert"}>
        <div className="card__title">
            <Icon name="four" />
            <Icon name="zero" />
            <Icon name="four" />
        </div>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <p>Or maybe the admin haven't implemented it yet :D Who knows...</p>
        <Link to="/" className="card__button">Go back home</Link>
      </article>
    </main>
  )
}

