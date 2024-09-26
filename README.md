# Hapi

## Overview

This project demonstrates how to generate a signature and encrypt user credentials in a web application called **Hapi Trade**.

## Remarks

### Request Analysis

Let's take a look at what happens when you try to make a request. 

We can see that the first request validating the email contains a signature and a timestamp:

![Request Analysis](https://i.imgur.com/TGYBFAR.png)

### Code Exploration

If we examine the code files, we can start searching, assuming that the functions will have references to what is sent in the request. 

Indeed, we find several references made to obtain the signature and the timestamp:

![Signature and Timestamp References](https://imgur.com/8rXTx3Z.png)

Now, keeping all that in mind, we notice a reference to generating the token. Let's check what that function contains:

![Token Generation Reference](https://imgur.com/gLuNIOt.png)

Upon searching for the function to generate the signature, we come across a class called `CryptoUtility` that has two static methods: `encrypt` and `generateSignature`. We also observe that they utilize **forge**, indicating that they are using [node-forge](https://www.npmjs.com/package/node-forge).

### Code Examination

Now that we have identified the necessary functions for generating the signature, let's proceed to examine what the code does and the parameters it requires.

Let's set some breakpoints where these functions are located. We observe that when we try to input the email, it takes us to the `getTimestamp` function, which has returned a value:

![Timestamp Function](https://imgur.com/n7Mj28J.png)
