import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const endpointsTable = pgTable('endpoints', {
    id: uuid().primaryKey().defaultRandom(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    request_count: integer('request_count').notNull().default(0),
})

export const requestsTable = pgTable('requests', {
    id: uuid().primaryKey().defaultRandom(),
    endpointId: uuid("endpoint_id")
        .notNull()
        .references(() => endpointsTable.id),
    method: varchar("method", { length: 10 }).notNull(),

    headers: jsonb("headers").notNull(),
    body: jsonb("body"),
    queryParams: jsonb("query_params"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const endpointsRelations = relations(endpointsTable, ({ many }) => ({
    requests: many(requestsTable),
}));

export const requestsRelations = relations(requestsTable, ({ one }) => ({
    endpoint: one(endpointsTable, {
        fields: [requestsTable.endpointId],
        references: [endpointsTable.id],
    }),
}));
