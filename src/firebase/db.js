/* CURD Firestore Database */
import moment from 'moment'
import { db, auth } from './firebase'

// record history
export const recordHistory = async ({ collectionName, ...history }) => {
  const result = await db.collection(`${collectionName}_history`).add({ ...history, createdAt: moment().toDate(), createdBy: auth.currentUser?.uid })
  return result
}

// set any doc
export const setOneDoc = async ({
  collectionName,
  id,
  noLogging = false,
  ...doc
}) => {
  const result = await db
    .collection(collectionName)
    .doc(id)
    .set({ ...doc, updatedAt: moment().toDate() })
  if (!noLogging) {
    await recordHistory({
      collectionName, action: 'set', actionId: id, ...doc,
    })
  }
  return result
}

// add any doc
export const addOneDoc = async ({
  collectionName,
  id,
  noLogging = false,
  ...doc
}) => {
  const result = await db.collection(collectionName).add({ ...doc, createdAt: moment().toDate() })
  if (!noLogging) {
    await recordHistory({
      collectionName,
      action: 'add',
      actionId: result.id,
      ...doc,
    })
  }
  return result
}

// update any doc
export const updateOneDoc = async ({
  collectionName,
  id,
  noLogging = false,
  ...doc
}) => {
  const result = await db.collection(collectionName).doc(id).update({ ...doc, updatedAt: moment().toDate() })
  if (!noLogging) {
    await recordHistory({
      collectionName,
      action: 'update',
      actionId: id,
      ...doc,
    })
  }
  return result
}

// delete any doc
export const deleteOneDoc = async ({ collectionName, id, noLogging = false }) => {
  const result = await db.collection(collectionName).doc(id).delete()
  if (!noLogging) {
    await recordHistory({ collectionName, action: 'delete', id })
  }
  return result
}

// get any doc by id
export const getOneDoc = async ({ collectionName, id }) => {
  const result = await db.collection(collectionName).doc(id).get()
  return result
}

// get all docs
export const getAllDocs = async ({ collectionName }) => {
  const result = await db.collection(collectionName).get()
  return result
}

// get where docs
export const getWhereEqualDocs = async ({ collectionName, fieldName, value }) => {
  const result = await db.collection(collectionName).where(fieldName, '==', value).get()
  return result
}
