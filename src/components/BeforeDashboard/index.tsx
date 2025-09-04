import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>WDEG Admin Dashboard</h4>
      </Banner>
      <p>Manage WDEG feedback and content for the digital book platform.</p>

      <div className={`${baseClass}__grid`}>
        <div className={`${baseClass}__card`}>
          <h5 className={`${baseClass}__card-title ${baseClass}__card-title--feedback`}>
            📝 Feedback Forms
          </h5>
          <p className={`${baseClass}__card-description`}>
            View and manage reader feedback submissions for the WDEG digital book.
          </p>
          <a
            href="/admin/collections/form-submissions"
            className={`${baseClass}__card-link ${baseClass}__card-link--feedback`}
          >
            View Feedback Submissions →
          </a>
        </div>

        <div className={`${baseClass}__card`}>
          <h5 className={`${baseClass}__card-title ${baseClass}__card-title--content`}>
            📚 Content Management
          </h5>
          <p className={`${baseClass}__card-description`}>
            Manage WDEG book pages, posts, and related content.
          </p>
          <div className={`${baseClass}__card-links`}>
            <a
              href="/admin/collections/pages"
              className={`${baseClass}__card-link ${baseClass}__card-link--content`}
            >
              Manage Pages →
            </a>
            <a
              href="/admin/collections/posts"
              className={`${baseClass}__card-link ${baseClass}__card-link--content`}
            >
              Manage Posts →
            </a>
          </div>
        </div>

        <div className={`${baseClass}__card`}>
          <h5 className={`${baseClass}__card-title ${baseClass}__card-title--media`}>
            🎨 Media & Assets
          </h5>
          <p className={`${baseClass}__card-description`}>
            Upload and manage images, documents, and other media files.
          </p>
          <a
            href="/admin/collections/media"
            className={`${baseClass}__card-link ${baseClass}__card-link--media`}
          >
            Manage Media →
          </a>
        </div>
      </div>

      <h5 className={`${baseClass}__quick-actions-title`}>Quick Actions:</h5>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <a
            href="/"
            target="_blank"
            className={`${baseClass}__instructions-link ${baseClass}__instructions-link--primary`}
          >
            🌐 Visit WDEG Website
          </a>
          <span className={`${baseClass}__instructions-description`}>
            {' '}
            - View the public-facing digital book
          </span>
        </li>
        <li>
          <a
            href="/admin/collections/forms"
            target="_blank"
            className={`${baseClass}__instructions-link ${baseClass}__instructions-link--success`}
          >
            📋 Manage Forms
          </a>
          <span className={`${baseClass}__instructions-description`}>
            {' '}
            - Create and edit feedback forms
          </span>
        </li>
        <li>
          <a
            href="/api/mcp/health"
            target="_blank"
            className={`${baseClass}__instructions-link ${baseClass}__instructions-link--success`}
          >
            🤖 MCP Server Status
          </a>
          <span className={`${baseClass}__instructions-description`}>
            {' '}
            - AI agent API access and health monitoring
          </span>
        </li>
        <li>
          <SeedButton />
          <span className={`${baseClass}__instructions-description`}>
            {' '}
            the database if you need to reset or add sample data
          </span>
        </li>
      </ul>

      <div className={`${baseClass}__status`}>
        <h5 className={`${baseClass}__status-title`}>📊 WDEG Platform Status</h5>
        <p className={`${baseClass}__status-description`}>
          The WDEG digital book platform is operational and ready to collect reader feedback. The
          system includes interactive content, feedback collection, and content management
          capabilities.
        </p>
        <p className={`${baseClass}__status-info`}>
          <strong>Platform:</strong> Angel OS WDEG Module | <strong>Status:</strong> Active
        </p>
      </div>
    </div>
  )
}

export default BeforeDashboard
