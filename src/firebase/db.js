/* CURD Firestore Database */
import moment from 'moment'
import { db } from './firebase'

// record history
export const recordHistory = async ({ collectionName, ...history }) => {
  const result = await db.collection(`${collectionName}_history`).add({ ...history, createdAt: moment().toDate() })
  return result
}

// set any doc
export const setOneDoc = async ({ collectionName, id, ...doc }) => {
  await recordHistory({
    collectionName, action: 'set', actionId: id, ...doc,
  })
  const result = await db
    .collection(collectionName)
    .doc(id)
    .set({ ...doc, updatedAt: moment().toDate() })
  return result
}

// add any doc
export const addOneDoc = async ({ collectionName, id, ...doc }) => {
  await recordHistory({
    collectionName,
    action: 'add',
    ...doc,
  })
  const result = await db.collection(collectionName).add({ ...doc, createdAt: moment().toDate() })
  return result
}

// update any doc
export const updateOneDoc = async ({ collectionName, id, ...doc }) => {
  await recordHistory({
    collectionName,
    action: 'update',
    actionId: id,
    ...doc,
  })
  const result = await db.collection(collectionName).doc(id).update({ ...doc, updatedAt: moment().toDate() })
  return result
}

// delete any doc
export const deleteOneDoc = async ({ collectionName, id }) => {
  await recordHistory({ collectionName, action: 'delete', id })
  const result = await db.collection(collectionName).doc(id).delete()
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
