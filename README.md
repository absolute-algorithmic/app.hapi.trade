# Hapi

## Overview

This project demonstrates how to generate a signature and encrypt user credentials in a web application called **Hapi Trade**.

## Content

### Request Analysis

When attempting to make a request, the first validation of the email includes a signature and a timestamp:

![Request Analysis](https://i.imgur.com/TGYBFAR.png)

### Code Exploration

Upon exploring the code files, we look for functions that reference what is sent in the request. We find several references related to obtaining the signature and the timestamp:

![Signature and Timestamp References](https://imgur.com/8rXTx3Z.png)

We also notice a reference to token generation. Let's check what this function contains:

![Token Generation Reference](https://imgur.com/gLuNIOt.png)

Searching for the function to generate the signature, we come across a class called `CryptoUtility`, which has two static methods: `encrypt` and `generateSignature`. These methods utilize **forge**, indicating the use of [node-forge](https://www.npmjs.com/package/node-forge).

### Code Examination

Now that we have identified the necessary functions for generating the signature, let's examine their implementation and the parameters they require.

We set some breakpoints where these functions are located. When we input the email, it leads us to the `getTimestamp` function, which returns a value:

![Timestamp Function](https://imgur.com/n7Mj28J.png)

Here, we can see how the variable `Ue` is set, which is used in the header `timestamp`.

![Timestamp Set](https://imgur.com/Hxgz5Lr.png)

Continuing forward, we reach the function responsible for obtaining the signature:

![GetSignature](https://imgur.com/IjwbxKE.png)

It's important to note that `getSignature` specifically requires two parameters: **Ee** and **$e**.

- **Ee** refers to a GraphQL query.
![GetSignature](https://imgur.com/6ZbdYqJ.png)

**Ee** transforms the query, but it only utilizes part of it, making replication somewhat unnecessary.
![GetSignature](https://imgur.com/zmohMZy.png)

As we continue, we encounter a function that parses a specific string. Let's examine what it does.
![GetSignature](https://imgur.com/9f2e9j8.png)

The function `parse$4` analyzes a string formatted as key-value pairs, decodes the keys and values, and returns an object containing these pairs. Since the string is simply a static cookie, there's no need to replicate this function.

After processing, we see that the function returns a JSON object with several values:
![GetSignature](https://imgur.com/9XRGJR7.png)

Let's see how these values are used:
![GetSignature](https://imgur.com/59dbi6O.png)

We can note that the following function calls the value `sessionKey`:
![GetSignature](https://imgur.com/GVxzzpB.png)

This value is now set in the variable **Oe**.

As we proceed, we observe a variable called **Ne** that concatenates other variables to create a final string:
![GetSignature](https://imgur.com/y1zNQxU.png)

The components of this string include:

- Timestamp
- Transformed Query
- Platform Name
- Platform App Version

The values for 'Platform Name' and 'Platform App Version' can be found in the defined requests.

Finally, we see the generation of the signature using the aforementioned values:
![GetSignature](https://imgur.com/cL3r84e.png)

Completing the function yields the generated signature as a result:
![GetSignature](https://imgur.com/cwhc9AZ.png)

![GetSignature](https://imgur.com/tBJZD5d.png)
