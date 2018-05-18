const tmpXml = `<RESPONSE>
<SERVICE>ENQUIRY</SERVICE>
<ACTION>A</ACTION>
<STATUS>OK</STATUS>
<MESSAGE>
  <HEADER>
    <CLIENT_ID>{clientId}</CLIENT_ID>
    <USER_ID>{userId}</USER_ID>
    <VERSION_NO>2.0</VERSION_NO>
    <RUN_NO>{runNo}</RUN_NO>
    <TOT_ITEMS>1</TOT_ITEMS>
    <ERR_ITEMS>0</ERR_ITEMS>
    <INF_ITEMS>0</INF_ITEMS>
  </HEADER>
  <ITEM>
    <RSP_ENQUIRY_REF>{enquiryReference}</RSP_ENQUIRY_REF>
    <RSP_REPORT>
      <ENQUIRY_NUMBER>270</ENQUIRY_NUMBER>
      <RSP_ENQUIRY_REF>{enquiryReference}</RSP_ENQUIRY_REF>
      <ENQUIRY_TYPE>{enquiryType}</ENQUIRY_TYPE>
      <ACCOUNT_TYPE>{accountType}</ACCOUNT_TYPE>
      <PRODUCT_TYPE>{productType}</PRODUCT_TYPE>`
console.log(tmpXml.replace(/{enquiryReference}/g, 'cuitao'))
