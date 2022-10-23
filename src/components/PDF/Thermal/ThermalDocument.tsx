import React from 'react';
import {
  Document, Page, StyleSheet, View, Text, Image,
} from '@react-pdf/renderer';
import Logo from '../../../assets/png/logo_sea_deals.png';

export interface ProductDetailThermal {
  name: string
  variant: string
  quantity: number
}

export interface Thermal {
  buyer:{
    name: string
    address: string
    city: string
  },
  seller_name: string
  total_weight: number
  delivery_number : string
  origin_city : string
  products: Array<ProductDetailThermal>
}

const styles = StyleSheet.create(
  {
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      fontSize: '12px',
    },
    container: {
      width: '90%',
      margin: '0 auto',
    },

    content: {
      marginTop: '24px',
    },
    content_row: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    content_column: {
      flexDirection: 'column',
    },
    content_table: {
      flexDirection: 'column',
      display: 'flex',
    },

    image: {
      maxWidth: '150px',
    },
    subtitle: {
      fontWeight: 'bold',
    },
  },
);

const ThermalDocument = ({ data }:{ data:Thermal }) => (
  <Document>
    <Page size="A4">

      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.content_row}>
            <Image style={styles.image} src={Logo} />
            <View>
              <Text>Invoice</Text>
            </View>
          </View>
        </View>
        <Text>{data?.origin_city}</Text>
        <Text>TEST</Text>
      </View>
    </Page>
  </Document>
);

export default ThermalDocument;
