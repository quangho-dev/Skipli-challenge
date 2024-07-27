import firebase from "../firebase.js";
import User from "../models/userModel.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { sendSMSMessage } from "../sms.js";

const db = getFirestore(firebase);

export const createNewAccessCode = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const random6DigitNumber = generateRandom6DigitNumber();

    const userInfo = { phoneNumber, accessCode: random6DigitNumber };

    await addDoc(collection(db, "users"), userInfo);

    const smsMessage = `Your access code is ${random6DigitNumber}`;

    sendSMSMessage(smsMessage, phoneNumber);

    res.status(200).json({ accessCode: random6DigitNumber });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const generateRandom6DigitNumber = () =>
  Math.floor(100000 + Math.random() * 900000);
