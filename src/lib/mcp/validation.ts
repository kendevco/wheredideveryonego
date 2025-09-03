import { z } from 'zod'

// Base schemas
export const CollectionSlugSchema = z.string().min(1).max(50)
export const DocumentIdSchema = z.string().min(1)
export const WhereSchema = z.record(z.string(), z.any()).optional()

// Query parameter schemas
export const QueryParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  where: WhereSchema,
  sort: z.string().optional(),
  populate: z.string().optional(),
  select: z.string().optional(),
})

// Request body schemas
export const AuthRequestSchema = z.object({
  apiKey: z.string().min(1),
})

export const DocumentCreateSchema = z.object({
  data: z.record(z.string(), z.any()),
})

export const DocumentUpdateSchema = z.object({
  data: z.record(z.string(), z.any()),
})

export const BulkOperationSchema = z.object({
  operation: z.enum(['create', 'update', 'delete']),
  documents: z.array(
    z.object({
      id: z.string().optional(),
      data: z.record(z.string(), z.any()).optional(),
    }),
  ),
})

export const GlobalUpdateSchema = z.object({
  data: z.record(z.string(), z.any()),
})

export class MCPValidator {
  /**
   * Validate collection slug format
   */
  static validateCollectionSlug(slug: string): boolean {
    try {
      CollectionSlugSchema.parse(slug)
      return true
    } catch {
      return false
    }
  }

  /**
   * Validate document ID format
   */
  static validateDocumentId(id: string): boolean {
    try {
      DocumentIdSchema.parse(id)
      return true
    } catch {
      return false
    }
  }

  /**
   * Validate ObjectId format (alias for validateDocumentId)
   */
  static validateObjectId(id: string): boolean {
    return this.validateDocumentId(id)
  }

  /**
   * Validate query parameters
   */
  static validateQueryParams(params: unknown) {
    try {
      const result = QueryParamsSchema.parse(params)
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof z.ZodError ? error.issues : 'Invalid query parameters',
      }
    }
  }

  /**
   * Validate authentication request
   */
  static validateAuthRequest(data: unknown) {
    try {
      const result = AuthRequestSchema.parse(data)
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof z.ZodError ? error.issues : 'Invalid authentication data',
      }
    }
  }

  /**
   * Alias for validateAuthRequest (used by auth route)
   */
  static validateAuth(data: unknown) {
    return this.validateAuthRequest(data)
  }

  /**
   * Validate document creation data
   */
  static validateDocumentCreate(data: unknown) {
    try {
      const result = DocumentCreateSchema.parse(data)
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof z.ZodError ? error.issues : 'Invalid document data',
      }
    }
  }

  /**
   * Validate document update data
   */
  static validateDocumentUpdate(data: unknown) {
    try {
      const result = DocumentUpdateSchema.parse(data)
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof z.ZodError ? error.issues : 'Invalid update data',
      }
    }
  }

  /**
   * Validate bulk operation data
   */
  static validateBulkOperation(data: unknown) {
    try {
      const result = BulkOperationSchema.parse(data)
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof z.ZodError ? error.issues : 'Invalid bulk operation data',
      }
    }
  }

  /**
   * Validate global update data
   */
  static validateGlobalUpdate(data: unknown) {
    try {
      const result = GlobalUpdateSchema.parse(data)
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof z.ZodError ? error.issues : 'Invalid global data',
      }
    }
  }
}
