import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { monthYearFormatter, monthFormatter } from "../helpers/dateFormatter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionByDate } from "../store/actionsFaisal";
import FieldCard from "./FieldCard";
import NumberFormat from 'react-number-format'

export default function DateCard({ navigation }) {
  const dispatch = useDispatch();
  const [dataAsyncUser, setDataAsyncUser] = useState("");
  const date = new Date();
  const monthYear = monthYearFormatter(date);
  let dataTransByDate = useSelector((state) => state.transByDate);

  async function getItem() {
    const dataAsyncUser = await AsyncStorage.getItem("@dataUser");
    setDataAsyncUser(JSON.parse(dataAsyncUser));
  }
  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    dispatch(fetchTransactionByDate(monthYear.numMonth, dataAsyncUser.data));
  }, [monthYear.numMonth, dataAsyncUser.data, dispatch, dataTransByDate]);

  if (!dataAsyncUser || !dataTransByDate.length) return null;

  // dataTransByDate = dataTransByDate.sort((a, b) => a.date - b.date);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textWarning}>You Have No Recorded Transactions</Text> */}
      {dataTransByDate.map((data, index) => (
        <View style={{ alignItems: "center" }} key={index}>
          <View style={styles.cardPerDate}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                width: 300
              }}
            >
              <Text style={styles.textDateCard}>{data.nameDate}</Text>
              <NumberFormat value={data.total} displayType={'text'} thousandSeparator={true} decimalScale={0} renderText={formattedValue =>
                <Text style={styles.textTotalCard}>{formattedValue}</Text>
              } />
            </View>
            <Text style={styles.borderTitleCard}></Text>

            {data.items.map((item, index) => (
              <FieldCard
                key={index}
                item={item}
                navigation={navigation}
              ></FieldCard>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A2DBFA",
    // borderWidth: 5
  },
  cardPerDate: {
    // borderWidth: 2,
    width: 340,
    backgroundColor: "white",
    marginTop: 10,
    paddingLeft: 5,
    borderRadius: 10,
    paddingVertical: 10,
  },
  textDateCard: {
    width: 180,
    fontSize: 17,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  textTotalCard: {
    fontSize: 17,
    textAlign: 'right',
    // paddingHorizontal: 10,
    fontWeight: "bold",
  },
  borderTitleCard: {
    height: 2,
    width: 300,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
