/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ResultsLayoutImport } from './routes/results/_layout'
import { Route as ProjectNewImport } from './routes/project/new'
import { Route as ProjectLayoutImport } from './routes/project/_layout'
import { Route as LibrariesLayoutImport } from './routes/libraries/_layout'
import { Route as ResultsLayoutIndexImport } from './routes/results/_layout/index'
import { Route as ProjectLayoutIndexImport } from './routes/project/_layout/index'
import { Route as LibrariesLayoutIndexImport } from './routes/libraries/_layout/index'
import { Route as ResultsLayoutWorstCaseImport } from './routes/results/_layout/worst-case'
import { Route as ResultsLayoutScriptImport } from './routes/results/_layout/script'
import { Route as ResultsLayoutSourcesIndexImport } from './routes/results/_layout/sources/index'
import { Route as ResultsLayoutLinesIndexImport } from './routes/results/_layout/lines/index'
import { Route as ProjectLayoutSourcesIndexImport } from './routes/project/_layout/sources/index'
import { Route as ProjectLayoutLinesIndexImport } from './routes/project/_layout/lines/index'
import { Route as LibrariesLayoutTowerGeometriesIndexImport } from './routes/libraries/_layout/tower-geometries/index'
import { Route as LibrariesLayoutConductorTypesIndexImport } from './routes/libraries/_layout/conductor-types/index'
import { Route as ProjectLayoutSourcesNewImport } from './routes/project/_layout/sources/new'
import { Route as ProjectLayoutLinesNewImport } from './routes/project/_layout/lines/new'
import { Route as LibrariesLayoutTowerGeometriesNewImport } from './routes/libraries/_layout/tower-geometries/new'
import { Route as LibrariesLayoutConductorTypesNewImport } from './routes/libraries/_layout/conductor-types/new'
import { Route as ResultsLayoutSourcesSourceIdIndexImport } from './routes/results/_layout/sources/$sourceId/index'
import { Route as ResultsLayoutLinesLineIdIndexImport } from './routes/results/_layout/lines/$lineId/index'
import { Route as ProjectLayoutSourcesSourceIdIndexImport } from './routes/project/_layout/sources/$sourceId/index'
import { Route as ProjectLayoutLinesLineIdIndexImport } from './routes/project/_layout/lines/$lineId/index'
import { Route as LibrariesLayoutTowerGeometriesGeometryIdIndexImport } from './routes/libraries/_layout/tower-geometries/$geometryId/index'
import { Route as LibrariesLayoutConductorTypesTypeIdIndexImport } from './routes/libraries/_layout/conductor-types/$typeId/index'
import { Route as ProjectLayoutLinesLineIdTowerIdIndexImport } from './routes/project/_layout/lines/$lineId/$towerId/index'

// Create Virtual Routes

const ResultsImport = createFileRoute('/results')()
const ProjectImport = createFileRoute('/project')()
const LibrariesImport = createFileRoute('/libraries')()

// Create/Update Routes

const ResultsRoute = ResultsImport.update({
  path: '/results',
  getParentRoute: () => rootRoute,
} as any)

const ProjectRoute = ProjectImport.update({
  path: '/project',
  getParentRoute: () => rootRoute,
} as any)

const LibrariesRoute = LibrariesImport.update({
  path: '/libraries',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ResultsLayoutRoute = ResultsLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => ResultsRoute,
} as any)

const ProjectNewRoute = ProjectNewImport.update({
  path: '/new',
  getParentRoute: () => ProjectRoute,
} as any)

const ProjectLayoutRoute = ProjectLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => ProjectRoute,
} as any)

const LibrariesLayoutRoute = LibrariesLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => LibrariesRoute,
} as any)

const ResultsLayoutIndexRoute = ResultsLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => ResultsLayoutRoute,
} as any)

const ProjectLayoutIndexRoute = ProjectLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => ProjectLayoutRoute,
} as any)

const LibrariesLayoutIndexRoute = LibrariesLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => LibrariesLayoutRoute,
} as any)

const ResultsLayoutWorstCaseRoute = ResultsLayoutWorstCaseImport.update({
  path: '/worst-case',
  getParentRoute: () => ResultsLayoutRoute,
} as any)

const ResultsLayoutScriptRoute = ResultsLayoutScriptImport.update({
  path: '/script',
  getParentRoute: () => ResultsLayoutRoute,
} as any)

const ResultsLayoutSourcesIndexRoute = ResultsLayoutSourcesIndexImport.update({
  path: '/sources/',
  getParentRoute: () => ResultsLayoutRoute,
} as any)

const ResultsLayoutLinesIndexRoute = ResultsLayoutLinesIndexImport.update({
  path: '/lines/',
  getParentRoute: () => ResultsLayoutRoute,
} as any)

const ProjectLayoutSourcesIndexRoute = ProjectLayoutSourcesIndexImport.update({
  path: '/sources/',
  getParentRoute: () => ProjectLayoutRoute,
} as any)

const ProjectLayoutLinesIndexRoute = ProjectLayoutLinesIndexImport.update({
  path: '/lines/',
  getParentRoute: () => ProjectLayoutRoute,
} as any)

const LibrariesLayoutTowerGeometriesIndexRoute =
  LibrariesLayoutTowerGeometriesIndexImport.update({
    path: '/tower-geometries/',
    getParentRoute: () => LibrariesLayoutRoute,
  } as any)

const LibrariesLayoutConductorTypesIndexRoute =
  LibrariesLayoutConductorTypesIndexImport.update({
    path: '/conductor-types/',
    getParentRoute: () => LibrariesLayoutRoute,
  } as any)

const ProjectLayoutSourcesNewRoute = ProjectLayoutSourcesNewImport.update({
  path: '/sources/new',
  getParentRoute: () => ProjectLayoutRoute,
} as any)

const ProjectLayoutLinesNewRoute = ProjectLayoutLinesNewImport.update({
  path: '/lines/new',
  getParentRoute: () => ProjectLayoutRoute,
} as any)

const LibrariesLayoutTowerGeometriesNewRoute =
  LibrariesLayoutTowerGeometriesNewImport.update({
    path: '/tower-geometries/new',
    getParentRoute: () => LibrariesLayoutRoute,
  } as any)

const LibrariesLayoutConductorTypesNewRoute =
  LibrariesLayoutConductorTypesNewImport.update({
    path: '/conductor-types/new',
    getParentRoute: () => LibrariesLayoutRoute,
  } as any)

const ResultsLayoutSourcesSourceIdIndexRoute =
  ResultsLayoutSourcesSourceIdIndexImport.update({
    path: '/sources/$sourceId/',
    getParentRoute: () => ResultsLayoutRoute,
  } as any)

const ResultsLayoutLinesLineIdIndexRoute =
  ResultsLayoutLinesLineIdIndexImport.update({
    path: '/lines/$lineId/',
    getParentRoute: () => ResultsLayoutRoute,
  } as any)

const ProjectLayoutSourcesSourceIdIndexRoute =
  ProjectLayoutSourcesSourceIdIndexImport.update({
    path: '/sources/$sourceId/',
    getParentRoute: () => ProjectLayoutRoute,
  } as any)

const ProjectLayoutLinesLineIdIndexRoute =
  ProjectLayoutLinesLineIdIndexImport.update({
    path: '/lines/$lineId/',
    getParentRoute: () => ProjectLayoutRoute,
  } as any)

const LibrariesLayoutTowerGeometriesGeometryIdIndexRoute =
  LibrariesLayoutTowerGeometriesGeometryIdIndexImport.update({
    path: '/tower-geometries/$geometryId/',
    getParentRoute: () => LibrariesLayoutRoute,
  } as any)

const LibrariesLayoutConductorTypesTypeIdIndexRoute =
  LibrariesLayoutConductorTypesTypeIdIndexImport.update({
    path: '/conductor-types/$typeId/',
    getParentRoute: () => LibrariesLayoutRoute,
  } as any)

const ProjectLayoutLinesLineIdTowerIdIndexRoute =
  ProjectLayoutLinesLineIdTowerIdIndexImport.update({
    path: '/lines/$lineId/$towerId/',
    getParentRoute: () => ProjectLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/libraries': {
      id: '/libraries'
      path: '/libraries'
      fullPath: '/libraries'
      preLoaderRoute: typeof LibrariesImport
      parentRoute: typeof rootRoute
    }
    '/libraries/_layout': {
      id: '/libraries/_layout'
      path: '/libraries'
      fullPath: '/libraries'
      preLoaderRoute: typeof LibrariesLayoutImport
      parentRoute: typeof LibrariesRoute
    }
    '/project': {
      id: '/project'
      path: '/project'
      fullPath: '/project'
      preLoaderRoute: typeof ProjectImport
      parentRoute: typeof rootRoute
    }
    '/project/_layout': {
      id: '/project/_layout'
      path: '/project'
      fullPath: '/project'
      preLoaderRoute: typeof ProjectLayoutImport
      parentRoute: typeof ProjectRoute
    }
    '/project/new': {
      id: '/project/new'
      path: '/new'
      fullPath: '/project/new'
      preLoaderRoute: typeof ProjectNewImport
      parentRoute: typeof ProjectImport
    }
    '/results': {
      id: '/results'
      path: '/results'
      fullPath: '/results'
      preLoaderRoute: typeof ResultsImport
      parentRoute: typeof rootRoute
    }
    '/results/_layout': {
      id: '/results/_layout'
      path: '/results'
      fullPath: '/results'
      preLoaderRoute: typeof ResultsLayoutImport
      parentRoute: typeof ResultsRoute
    }
    '/results/_layout/script': {
      id: '/results/_layout/script'
      path: '/script'
      fullPath: '/results/script'
      preLoaderRoute: typeof ResultsLayoutScriptImport
      parentRoute: typeof ResultsLayoutImport
    }
    '/results/_layout/worst-case': {
      id: '/results/_layout/worst-case'
      path: '/worst-case'
      fullPath: '/results/worst-case'
      preLoaderRoute: typeof ResultsLayoutWorstCaseImport
      parentRoute: typeof ResultsLayoutImport
    }
    '/libraries/_layout/': {
      id: '/libraries/_layout/'
      path: '/'
      fullPath: '/libraries/'
      preLoaderRoute: typeof LibrariesLayoutIndexImport
      parentRoute: typeof LibrariesLayoutImport
    }
    '/project/_layout/': {
      id: '/project/_layout/'
      path: '/'
      fullPath: '/project/'
      preLoaderRoute: typeof ProjectLayoutIndexImport
      parentRoute: typeof ProjectLayoutImport
    }
    '/results/_layout/': {
      id: '/results/_layout/'
      path: '/'
      fullPath: '/results/'
      preLoaderRoute: typeof ResultsLayoutIndexImport
      parentRoute: typeof ResultsLayoutImport
    }
    '/libraries/_layout/conductor-types/new': {
      id: '/libraries/_layout/conductor-types/new'
      path: '/conductor-types/new'
      fullPath: '/libraries/conductor-types/new'
      preLoaderRoute: typeof LibrariesLayoutConductorTypesNewImport
      parentRoute: typeof LibrariesLayoutImport
    }
    '/libraries/_layout/tower-geometries/new': {
      id: '/libraries/_layout/tower-geometries/new'
      path: '/tower-geometries/new'
      fullPath: '/libraries/tower-geometries/new'
      preLoaderRoute: typeof LibrariesLayoutTowerGeometriesNewImport
      parentRoute: typeof LibrariesLayoutImport
    }
    '/project/_layout/lines/new': {
      id: '/project/_layout/lines/new'
      path: '/lines/new'
      fullPath: '/project/lines/new'
      preLoaderRoute: typeof ProjectLayoutLinesNewImport
      parentRoute: typeof ProjectLayoutImport
    }
    '/project/_layout/sources/new': {
      id: '/project/_layout/sources/new'
      path: '/sources/new'
      fullPath: '/project/sources/new'
      preLoaderRoute: typeof ProjectLayoutSourcesNewImport
      parentRoute: typeof ProjectLayoutImport
    }
    '/libraries/_layout/conductor-types/': {
      id: '/libraries/_layout/conductor-types/'
      path: '/conductor-types'
      fullPath: '/libraries/conductor-types'
      preLoaderRoute: typeof LibrariesLayoutConductorTypesIndexImport
      parentRoute: typeof LibrariesLayoutImport
    }
    '/libraries/_layout/tower-geometries/': {
      id: '/libraries/_layout/tower-geometries/'
      path: '/tower-geometries'
      fullPath: '/libraries/tower-geometries'
      preLoaderRoute: typeof LibrariesLayoutTowerGeometriesIndexImport
      parentRoute: typeof LibrariesLayoutImport
    }
    '/project/_layout/lines/': {
      id: '/project/_layout/lines/'
      path: '/lines'
      fullPath: '/project/lines'
      preLoaderRoute: typeof ProjectLayoutLinesIndexImport
      parentRoute: typeof ProjectLayoutImport
    }
    '/project/_layout/sources/': {
      id: '/project/_layout/sources/'
      path: '/sources'
      fullPath: '/project/sources'
      preLoaderRoute: typeof ProjectLayoutSourcesIndexImport
      parentRoute: typeof ProjectLayoutImport
    }
    '/results/_layout/lines/': {
      id: '/results/_layout/lines/'
      path: '/lines'
      fullPath: '/results/lines'
      preLoaderRoute: typeof ResultsLayoutLinesIndexImport
      parentRoute: typeof ResultsLayoutImport
    }
    '/results/_layout/sources/': {
      id: '/results/_layout/sources/'
      path: '/sources'
      fullPath: '/results/sources'
      preLoaderRoute: typeof ResultsLayoutSourcesIndexImport
      parentRoute: typeof ResultsLayoutImport
    }
    '/libraries/_layout/conductor-types/$typeId/': {
      id: '/libraries/_layout/conductor-types/$typeId/'
      path: '/conductor-types/$typeId'
      fullPath: '/libraries/conductor-types/$typeId'
      preLoaderRoute: typeof LibrariesLayoutConductorTypesTypeIdIndexImport
      parentRoute: typeof LibrariesLayoutImport
    }
    '/libraries/_layout/tower-geometries/$geometryId/': {
      id: '/libraries/_layout/tower-geometries/$geometryId/'
      path: '/tower-geometries/$geometryId'
      fullPath: '/libraries/tower-geometries/$geometryId'
      preLoaderRoute: typeof LibrariesLayoutTowerGeometriesGeometryIdIndexImport
      parentRoute: typeof LibrariesLayoutImport
    }
    '/project/_layout/lines/$lineId/': {
      id: '/project/_layout/lines/$lineId/'
      path: '/lines/$lineId'
      fullPath: '/project/lines/$lineId'
      preLoaderRoute: typeof ProjectLayoutLinesLineIdIndexImport
      parentRoute: typeof ProjectLayoutImport
    }
    '/project/_layout/sources/$sourceId/': {
      id: '/project/_layout/sources/$sourceId/'
      path: '/sources/$sourceId'
      fullPath: '/project/sources/$sourceId'
      preLoaderRoute: typeof ProjectLayoutSourcesSourceIdIndexImport
      parentRoute: typeof ProjectLayoutImport
    }
    '/results/_layout/lines/$lineId/': {
      id: '/results/_layout/lines/$lineId/'
      path: '/lines/$lineId'
      fullPath: '/results/lines/$lineId'
      preLoaderRoute: typeof ResultsLayoutLinesLineIdIndexImport
      parentRoute: typeof ResultsLayoutImport
    }
    '/results/_layout/sources/$sourceId/': {
      id: '/results/_layout/sources/$sourceId/'
      path: '/sources/$sourceId'
      fullPath: '/results/sources/$sourceId'
      preLoaderRoute: typeof ResultsLayoutSourcesSourceIdIndexImport
      parentRoute: typeof ResultsLayoutImport
    }
    '/project/_layout/lines/$lineId/$towerId/': {
      id: '/project/_layout/lines/$lineId/$towerId/'
      path: '/lines/$lineId/$towerId'
      fullPath: '/project/lines/$lineId/$towerId'
      preLoaderRoute: typeof ProjectLayoutLinesLineIdTowerIdIndexImport
      parentRoute: typeof ProjectLayoutImport
    }
  }
}

// Create and export the route tree

interface LibrariesLayoutRouteChildren {
  LibrariesLayoutIndexRoute: typeof LibrariesLayoutIndexRoute
  LibrariesLayoutConductorTypesNewRoute: typeof LibrariesLayoutConductorTypesNewRoute
  LibrariesLayoutTowerGeometriesNewRoute: typeof LibrariesLayoutTowerGeometriesNewRoute
  LibrariesLayoutConductorTypesIndexRoute: typeof LibrariesLayoutConductorTypesIndexRoute
  LibrariesLayoutTowerGeometriesIndexRoute: typeof LibrariesLayoutTowerGeometriesIndexRoute
  LibrariesLayoutConductorTypesTypeIdIndexRoute: typeof LibrariesLayoutConductorTypesTypeIdIndexRoute
  LibrariesLayoutTowerGeometriesGeometryIdIndexRoute: typeof LibrariesLayoutTowerGeometriesGeometryIdIndexRoute
}

const LibrariesLayoutRouteChildren: LibrariesLayoutRouteChildren = {
  LibrariesLayoutIndexRoute: LibrariesLayoutIndexRoute,
  LibrariesLayoutConductorTypesNewRoute: LibrariesLayoutConductorTypesNewRoute,
  LibrariesLayoutTowerGeometriesNewRoute:
    LibrariesLayoutTowerGeometriesNewRoute,
  LibrariesLayoutConductorTypesIndexRoute:
    LibrariesLayoutConductorTypesIndexRoute,
  LibrariesLayoutTowerGeometriesIndexRoute:
    LibrariesLayoutTowerGeometriesIndexRoute,
  LibrariesLayoutConductorTypesTypeIdIndexRoute:
    LibrariesLayoutConductorTypesTypeIdIndexRoute,
  LibrariesLayoutTowerGeometriesGeometryIdIndexRoute:
    LibrariesLayoutTowerGeometriesGeometryIdIndexRoute,
}

const LibrariesLayoutRouteWithChildren = LibrariesLayoutRoute._addFileChildren(
  LibrariesLayoutRouteChildren,
)

interface LibrariesRouteChildren {
  LibrariesLayoutRoute: typeof LibrariesLayoutRouteWithChildren
}

const LibrariesRouteChildren: LibrariesRouteChildren = {
  LibrariesLayoutRoute: LibrariesLayoutRouteWithChildren,
}

const LibrariesRouteWithChildren = LibrariesRoute._addFileChildren(
  LibrariesRouteChildren,
)

interface ProjectLayoutRouteChildren {
  ProjectLayoutIndexRoute: typeof ProjectLayoutIndexRoute
  ProjectLayoutLinesNewRoute: typeof ProjectLayoutLinesNewRoute
  ProjectLayoutSourcesNewRoute: typeof ProjectLayoutSourcesNewRoute
  ProjectLayoutLinesIndexRoute: typeof ProjectLayoutLinesIndexRoute
  ProjectLayoutSourcesIndexRoute: typeof ProjectLayoutSourcesIndexRoute
  ProjectLayoutLinesLineIdIndexRoute: typeof ProjectLayoutLinesLineIdIndexRoute
  ProjectLayoutSourcesSourceIdIndexRoute: typeof ProjectLayoutSourcesSourceIdIndexRoute
  ProjectLayoutLinesLineIdTowerIdIndexRoute: typeof ProjectLayoutLinesLineIdTowerIdIndexRoute
}

const ProjectLayoutRouteChildren: ProjectLayoutRouteChildren = {
  ProjectLayoutIndexRoute: ProjectLayoutIndexRoute,
  ProjectLayoutLinesNewRoute: ProjectLayoutLinesNewRoute,
  ProjectLayoutSourcesNewRoute: ProjectLayoutSourcesNewRoute,
  ProjectLayoutLinesIndexRoute: ProjectLayoutLinesIndexRoute,
  ProjectLayoutSourcesIndexRoute: ProjectLayoutSourcesIndexRoute,
  ProjectLayoutLinesLineIdIndexRoute: ProjectLayoutLinesLineIdIndexRoute,
  ProjectLayoutSourcesSourceIdIndexRoute:
    ProjectLayoutSourcesSourceIdIndexRoute,
  ProjectLayoutLinesLineIdTowerIdIndexRoute:
    ProjectLayoutLinesLineIdTowerIdIndexRoute,
}

const ProjectLayoutRouteWithChildren = ProjectLayoutRoute._addFileChildren(
  ProjectLayoutRouteChildren,
)

interface ProjectRouteChildren {
  ProjectLayoutRoute: typeof ProjectLayoutRouteWithChildren
  ProjectNewRoute: typeof ProjectNewRoute
}

const ProjectRouteChildren: ProjectRouteChildren = {
  ProjectLayoutRoute: ProjectLayoutRouteWithChildren,
  ProjectNewRoute: ProjectNewRoute,
}

const ProjectRouteWithChildren =
  ProjectRoute._addFileChildren(ProjectRouteChildren)

interface ResultsLayoutRouteChildren {
  ResultsLayoutScriptRoute: typeof ResultsLayoutScriptRoute
  ResultsLayoutWorstCaseRoute: typeof ResultsLayoutWorstCaseRoute
  ResultsLayoutIndexRoute: typeof ResultsLayoutIndexRoute
  ResultsLayoutLinesIndexRoute: typeof ResultsLayoutLinesIndexRoute
  ResultsLayoutSourcesIndexRoute: typeof ResultsLayoutSourcesIndexRoute
  ResultsLayoutLinesLineIdIndexRoute: typeof ResultsLayoutLinesLineIdIndexRoute
  ResultsLayoutSourcesSourceIdIndexRoute: typeof ResultsLayoutSourcesSourceIdIndexRoute
}

const ResultsLayoutRouteChildren: ResultsLayoutRouteChildren = {
  ResultsLayoutScriptRoute: ResultsLayoutScriptRoute,
  ResultsLayoutWorstCaseRoute: ResultsLayoutWorstCaseRoute,
  ResultsLayoutIndexRoute: ResultsLayoutIndexRoute,
  ResultsLayoutLinesIndexRoute: ResultsLayoutLinesIndexRoute,
  ResultsLayoutSourcesIndexRoute: ResultsLayoutSourcesIndexRoute,
  ResultsLayoutLinesLineIdIndexRoute: ResultsLayoutLinesLineIdIndexRoute,
  ResultsLayoutSourcesSourceIdIndexRoute:
    ResultsLayoutSourcesSourceIdIndexRoute,
}

const ResultsLayoutRouteWithChildren = ResultsLayoutRoute._addFileChildren(
  ResultsLayoutRouteChildren,
)

interface ResultsRouteChildren {
  ResultsLayoutRoute: typeof ResultsLayoutRouteWithChildren
}

const ResultsRouteChildren: ResultsRouteChildren = {
  ResultsLayoutRoute: ResultsLayoutRouteWithChildren,
}

const ResultsRouteWithChildren =
  ResultsRoute._addFileChildren(ResultsRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/libraries': typeof LibrariesLayoutRouteWithChildren
  '/project': typeof ProjectLayoutRouteWithChildren
  '/project/new': typeof ProjectNewRoute
  '/results': typeof ResultsLayoutRouteWithChildren
  '/results/script': typeof ResultsLayoutScriptRoute
  '/results/worst-case': typeof ResultsLayoutWorstCaseRoute
  '/libraries/': typeof LibrariesLayoutIndexRoute
  '/project/': typeof ProjectLayoutIndexRoute
  '/results/': typeof ResultsLayoutIndexRoute
  '/libraries/conductor-types/new': typeof LibrariesLayoutConductorTypesNewRoute
  '/libraries/tower-geometries/new': typeof LibrariesLayoutTowerGeometriesNewRoute
  '/project/lines/new': typeof ProjectLayoutLinesNewRoute
  '/project/sources/new': typeof ProjectLayoutSourcesNewRoute
  '/libraries/conductor-types': typeof LibrariesLayoutConductorTypesIndexRoute
  '/libraries/tower-geometries': typeof LibrariesLayoutTowerGeometriesIndexRoute
  '/project/lines': typeof ProjectLayoutLinesIndexRoute
  '/project/sources': typeof ProjectLayoutSourcesIndexRoute
  '/results/lines': typeof ResultsLayoutLinesIndexRoute
  '/results/sources': typeof ResultsLayoutSourcesIndexRoute
  '/libraries/conductor-types/$typeId': typeof LibrariesLayoutConductorTypesTypeIdIndexRoute
  '/libraries/tower-geometries/$geometryId': typeof LibrariesLayoutTowerGeometriesGeometryIdIndexRoute
  '/project/lines/$lineId': typeof ProjectLayoutLinesLineIdIndexRoute
  '/project/sources/$sourceId': typeof ProjectLayoutSourcesSourceIdIndexRoute
  '/results/lines/$lineId': typeof ResultsLayoutLinesLineIdIndexRoute
  '/results/sources/$sourceId': typeof ResultsLayoutSourcesSourceIdIndexRoute
  '/project/lines/$lineId/$towerId': typeof ProjectLayoutLinesLineIdTowerIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/libraries': typeof LibrariesLayoutIndexRoute
  '/project': typeof ProjectLayoutIndexRoute
  '/project/new': typeof ProjectNewRoute
  '/results': typeof ResultsLayoutIndexRoute
  '/results/script': typeof ResultsLayoutScriptRoute
  '/results/worst-case': typeof ResultsLayoutWorstCaseRoute
  '/libraries/conductor-types/new': typeof LibrariesLayoutConductorTypesNewRoute
  '/libraries/tower-geometries/new': typeof LibrariesLayoutTowerGeometriesNewRoute
  '/project/lines/new': typeof ProjectLayoutLinesNewRoute
  '/project/sources/new': typeof ProjectLayoutSourcesNewRoute
  '/libraries/conductor-types': typeof LibrariesLayoutConductorTypesIndexRoute
  '/libraries/tower-geometries': typeof LibrariesLayoutTowerGeometriesIndexRoute
  '/project/lines': typeof ProjectLayoutLinesIndexRoute
  '/project/sources': typeof ProjectLayoutSourcesIndexRoute
  '/results/lines': typeof ResultsLayoutLinesIndexRoute
  '/results/sources': typeof ResultsLayoutSourcesIndexRoute
  '/libraries/conductor-types/$typeId': typeof LibrariesLayoutConductorTypesTypeIdIndexRoute
  '/libraries/tower-geometries/$geometryId': typeof LibrariesLayoutTowerGeometriesGeometryIdIndexRoute
  '/project/lines/$lineId': typeof ProjectLayoutLinesLineIdIndexRoute
  '/project/sources/$sourceId': typeof ProjectLayoutSourcesSourceIdIndexRoute
  '/results/lines/$lineId': typeof ResultsLayoutLinesLineIdIndexRoute
  '/results/sources/$sourceId': typeof ResultsLayoutSourcesSourceIdIndexRoute
  '/project/lines/$lineId/$towerId': typeof ProjectLayoutLinesLineIdTowerIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/libraries': typeof LibrariesRouteWithChildren
  '/libraries/_layout': typeof LibrariesLayoutRouteWithChildren
  '/project': typeof ProjectRouteWithChildren
  '/project/_layout': typeof ProjectLayoutRouteWithChildren
  '/project/new': typeof ProjectNewRoute
  '/results': typeof ResultsRouteWithChildren
  '/results/_layout': typeof ResultsLayoutRouteWithChildren
  '/results/_layout/script': typeof ResultsLayoutScriptRoute
  '/results/_layout/worst-case': typeof ResultsLayoutWorstCaseRoute
  '/libraries/_layout/': typeof LibrariesLayoutIndexRoute
  '/project/_layout/': typeof ProjectLayoutIndexRoute
  '/results/_layout/': typeof ResultsLayoutIndexRoute
  '/libraries/_layout/conductor-types/new': typeof LibrariesLayoutConductorTypesNewRoute
  '/libraries/_layout/tower-geometries/new': typeof LibrariesLayoutTowerGeometriesNewRoute
  '/project/_layout/lines/new': typeof ProjectLayoutLinesNewRoute
  '/project/_layout/sources/new': typeof ProjectLayoutSourcesNewRoute
  '/libraries/_layout/conductor-types/': typeof LibrariesLayoutConductorTypesIndexRoute
  '/libraries/_layout/tower-geometries/': typeof LibrariesLayoutTowerGeometriesIndexRoute
  '/project/_layout/lines/': typeof ProjectLayoutLinesIndexRoute
  '/project/_layout/sources/': typeof ProjectLayoutSourcesIndexRoute
  '/results/_layout/lines/': typeof ResultsLayoutLinesIndexRoute
  '/results/_layout/sources/': typeof ResultsLayoutSourcesIndexRoute
  '/libraries/_layout/conductor-types/$typeId/': typeof LibrariesLayoutConductorTypesTypeIdIndexRoute
  '/libraries/_layout/tower-geometries/$geometryId/': typeof LibrariesLayoutTowerGeometriesGeometryIdIndexRoute
  '/project/_layout/lines/$lineId/': typeof ProjectLayoutLinesLineIdIndexRoute
  '/project/_layout/sources/$sourceId/': typeof ProjectLayoutSourcesSourceIdIndexRoute
  '/results/_layout/lines/$lineId/': typeof ResultsLayoutLinesLineIdIndexRoute
  '/results/_layout/sources/$sourceId/': typeof ResultsLayoutSourcesSourceIdIndexRoute
  '/project/_layout/lines/$lineId/$towerId/': typeof ProjectLayoutLinesLineIdTowerIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/libraries'
    | '/project'
    | '/project/new'
    | '/results'
    | '/results/script'
    | '/results/worst-case'
    | '/libraries/'
    | '/project/'
    | '/results/'
    | '/libraries/conductor-types/new'
    | '/libraries/tower-geometries/new'
    | '/project/lines/new'
    | '/project/sources/new'
    | '/libraries/conductor-types'
    | '/libraries/tower-geometries'
    | '/project/lines'
    | '/project/sources'
    | '/results/lines'
    | '/results/sources'
    | '/libraries/conductor-types/$typeId'
    | '/libraries/tower-geometries/$geometryId'
    | '/project/lines/$lineId'
    | '/project/sources/$sourceId'
    | '/results/lines/$lineId'
    | '/results/sources/$sourceId'
    | '/project/lines/$lineId/$towerId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/libraries'
    | '/project'
    | '/project/new'
    | '/results'
    | '/results/script'
    | '/results/worst-case'
    | '/libraries/conductor-types/new'
    | '/libraries/tower-geometries/new'
    | '/project/lines/new'
    | '/project/sources/new'
    | '/libraries/conductor-types'
    | '/libraries/tower-geometries'
    | '/project/lines'
    | '/project/sources'
    | '/results/lines'
    | '/results/sources'
    | '/libraries/conductor-types/$typeId'
    | '/libraries/tower-geometries/$geometryId'
    | '/project/lines/$lineId'
    | '/project/sources/$sourceId'
    | '/results/lines/$lineId'
    | '/results/sources/$sourceId'
    | '/project/lines/$lineId/$towerId'
  id:
    | '__root__'
    | '/'
    | '/libraries'
    | '/libraries/_layout'
    | '/project'
    | '/project/_layout'
    | '/project/new'
    | '/results'
    | '/results/_layout'
    | '/results/_layout/script'
    | '/results/_layout/worst-case'
    | '/libraries/_layout/'
    | '/project/_layout/'
    | '/results/_layout/'
    | '/libraries/_layout/conductor-types/new'
    | '/libraries/_layout/tower-geometries/new'
    | '/project/_layout/lines/new'
    | '/project/_layout/sources/new'
    | '/libraries/_layout/conductor-types/'
    | '/libraries/_layout/tower-geometries/'
    | '/project/_layout/lines/'
    | '/project/_layout/sources/'
    | '/results/_layout/lines/'
    | '/results/_layout/sources/'
    | '/libraries/_layout/conductor-types/$typeId/'
    | '/libraries/_layout/tower-geometries/$geometryId/'
    | '/project/_layout/lines/$lineId/'
    | '/project/_layout/sources/$sourceId/'
    | '/results/_layout/lines/$lineId/'
    | '/results/_layout/sources/$sourceId/'
    | '/project/_layout/lines/$lineId/$towerId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LibrariesRoute: typeof LibrariesRouteWithChildren
  ProjectRoute: typeof ProjectRouteWithChildren
  ResultsRoute: typeof ResultsRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LibrariesRoute: LibrariesRouteWithChildren,
  ProjectRoute: ProjectRouteWithChildren,
  ResultsRoute: ResultsRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/libraries",
        "/project",
        "/results"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/libraries": {
      "filePath": "libraries",
      "children": [
        "/libraries/_layout"
      ]
    },
    "/libraries/_layout": {
      "filePath": "libraries/_layout.tsx",
      "parent": "/libraries",
      "children": [
        "/libraries/_layout/",
        "/libraries/_layout/conductor-types/new",
        "/libraries/_layout/tower-geometries/new",
        "/libraries/_layout/conductor-types/",
        "/libraries/_layout/tower-geometries/",
        "/libraries/_layout/conductor-types/$typeId/",
        "/libraries/_layout/tower-geometries/$geometryId/"
      ]
    },
    "/project": {
      "filePath": "project",
      "children": [
        "/project/_layout",
        "/project/new"
      ]
    },
    "/project/_layout": {
      "filePath": "project/_layout.tsx",
      "parent": "/project",
      "children": [
        "/project/_layout/",
        "/project/_layout/lines/new",
        "/project/_layout/sources/new",
        "/project/_layout/lines/",
        "/project/_layout/sources/",
        "/project/_layout/lines/$lineId/",
        "/project/_layout/sources/$sourceId/",
        "/project/_layout/lines/$lineId/$towerId/"
      ]
    },
    "/project/new": {
      "filePath": "project/new.tsx",
      "parent": "/project"
    },
    "/results": {
      "filePath": "results",
      "children": [
        "/results/_layout"
      ]
    },
    "/results/_layout": {
      "filePath": "results/_layout.tsx",
      "parent": "/results",
      "children": [
        "/results/_layout/script",
        "/results/_layout/worst-case",
        "/results/_layout/",
        "/results/_layout/lines/",
        "/results/_layout/sources/",
        "/results/_layout/lines/$lineId/",
        "/results/_layout/sources/$sourceId/"
      ]
    },
    "/results/_layout/script": {
      "filePath": "results/_layout/script.tsx",
      "parent": "/results/_layout"
    },
    "/results/_layout/worst-case": {
      "filePath": "results/_layout/worst-case.tsx",
      "parent": "/results/_layout"
    },
    "/libraries/_layout/": {
      "filePath": "libraries/_layout/index.tsx",
      "parent": "/libraries/_layout"
    },
    "/project/_layout/": {
      "filePath": "project/_layout/index.tsx",
      "parent": "/project/_layout"
    },
    "/results/_layout/": {
      "filePath": "results/_layout/index.tsx",
      "parent": "/results/_layout"
    },
    "/libraries/_layout/conductor-types/new": {
      "filePath": "libraries/_layout/conductor-types/new.tsx",
      "parent": "/libraries/_layout"
    },
    "/libraries/_layout/tower-geometries/new": {
      "filePath": "libraries/_layout/tower-geometries/new.tsx",
      "parent": "/libraries/_layout"
    },
    "/project/_layout/lines/new": {
      "filePath": "project/_layout/lines/new.tsx",
      "parent": "/project/_layout"
    },
    "/project/_layout/sources/new": {
      "filePath": "project/_layout/sources/new.tsx",
      "parent": "/project/_layout"
    },
    "/libraries/_layout/conductor-types/": {
      "filePath": "libraries/_layout/conductor-types/index.tsx",
      "parent": "/libraries/_layout"
    },
    "/libraries/_layout/tower-geometries/": {
      "filePath": "libraries/_layout/tower-geometries/index.tsx",
      "parent": "/libraries/_layout"
    },
    "/project/_layout/lines/": {
      "filePath": "project/_layout/lines/index.tsx",
      "parent": "/project/_layout"
    },
    "/project/_layout/sources/": {
      "filePath": "project/_layout/sources/index.tsx",
      "parent": "/project/_layout"
    },
    "/results/_layout/lines/": {
      "filePath": "results/_layout/lines/index.tsx",
      "parent": "/results/_layout"
    },
    "/results/_layout/sources/": {
      "filePath": "results/_layout/sources/index.tsx",
      "parent": "/results/_layout"
    },
    "/libraries/_layout/conductor-types/$typeId/": {
      "filePath": "libraries/_layout/conductor-types/$typeId/index.tsx",
      "parent": "/libraries/_layout"
    },
    "/libraries/_layout/tower-geometries/$geometryId/": {
      "filePath": "libraries/_layout/tower-geometries/$geometryId/index.tsx",
      "parent": "/libraries/_layout"
    },
    "/project/_layout/lines/$lineId/": {
      "filePath": "project/_layout/lines/$lineId/index.tsx",
      "parent": "/project/_layout"
    },
    "/project/_layout/sources/$sourceId/": {
      "filePath": "project/_layout/sources/$sourceId/index.tsx",
      "parent": "/project/_layout"
    },
    "/results/_layout/lines/$lineId/": {
      "filePath": "results/_layout/lines/$lineId/index.tsx",
      "parent": "/results/_layout"
    },
    "/results/_layout/sources/$sourceId/": {
      "filePath": "results/_layout/sources/$sourceId/index.tsx",
      "parent": "/results/_layout"
    },
    "/project/_layout/lines/$lineId/$towerId/": {
      "filePath": "project/_layout/lines/$lineId/$towerId/index.tsx",
      "parent": "/project/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
