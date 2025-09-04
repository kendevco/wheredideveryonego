// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres' // database-adapter-import

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
// AI plugin removed - can be re-added later when needed

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: '- Angel OS: WDEG',
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // database-adapter-config-start
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      max: 10, // Maximum number of connections in pool
      min: 2, // Minimum number of connections in pool
      idleTimeoutMillis: 10000, // Close connections after 10 seconds of inactivity
      connectionTimeoutMillis: 30000, // Maximum time to wait for connection (30 seconds)
    },
  }),
  // database-adapter-config-end
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://angel-os.kendev.co',
    getServerSideURL(),
  ],
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // payloadAiPlugin({
    //   collections: {
    //     [Pages.slug]: true,
    //     [Posts.slug]: true,
    //   },
    //   globals: {
    //     [Header.slug]: true,
    //     [Footer.slug]: true,
    //   },
    //   debugging: process.env.NODE_ENV === 'development',
    //   disableSponsorMessage: false,
    //   generatePromptOnInit: process.env.NODE_ENV === 'development',
    //   uploadCollectionSlug: 'media',
    //   access: {
    //     generate: ({ req }) => Boolean(req.user),
    //     settings: ({ req }) => Boolean(req.user),
    //   },
    // }),
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
