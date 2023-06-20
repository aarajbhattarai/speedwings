# Strapi Starter Next 13, Tailwind, Typescript and Strapi

note: This project was started with love by Trecia, Daniel and Paul. We were all new to Next 13 and Typescript. If you find any bugs or improvements feel free to create an issue. Thank you all for your support and participation.

![demo-site](https://user-images.githubusercontent.com/6153188/231865321-0da5e81f-4832-4cce-bcd1-ecd79e9b9cc3.gif)

## Getting Started

1. Clone the repository locally:

```bash
  git clone https://github.com/strapi/nextjs-corporate-starter.git
    or
  gh repo clone strapi/nextjs-corporate-starter
```



2. Next Set up your `.env` file. You can use use the `.env.example` file as reference:

```bash
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
```

4. Start Your Project by running the following command:

docker compose up -d

You will be prompted to create your first admin user.

![admin-user](https://user-images.githubusercontent.com/6153188/231865420-5f03a90f-b893-4057-9634-9632920a7d97.gif)

Great. You now have your project running. Let's add some data.

## Seeding The Data

We are going to use our DEITS feature which will alow to easily import data into your project.

You can learn more about it in our documentation. <-- need link to docs -->

In the root of our project we have our `seed-data.tar.gz` file. We will use it to seed our data.

1. Open up your terminal and make sure you are still in you `backend` folder.

2. Run the following command to seed your data:

```bash
  yarn strapi import -f ../seed-data.tar.gz
```

![after-import](https://user-images.githubusercontent.com/6153188/231865491-05cb5818-a0d0-49ce-807e-a879f7e3070c.gif)

This will import your data locally. Log back into your admin panel to see the newly imported data.

## Setting Up The Frontend

CD into your `frontend` directory and run the `yarn` to instal all of your dependencies.

Next we need to create our `.env` file and paste in the following.

```bash
NEXT_PUBLIC_STRAPI_API_TOKEN=tobemodified
NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN=tobemodified
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_PAGE_LIMIT=6
```

Before starting our Next JS app we need to go inside our Strapi Admin and create two tokens that we will be using for **form submission** and displaying our **content**.

Inside your Strapi Admin Panel navigate to Settings -> API Tokens and click on the `Create new API Token`.


Here are our Token Settings

Name: Public API Token Content
Description: Access to public content.
Token duration: Unlimited
Token type: Custom

In Permissions lets give the following access.

| Content  | Permissions   
|----------|:-------------:|
| Article | find and findOne |
| Author | find and findOne |
| Category | find and findOne |
| Global | find |
| Page | find and findOne |
| Product-feature | find and findOne |



Once you have your token add it to your `NEXT_PUBLIC_STRAPI_API_TOKEN` variable name in the `.env` file.

Also create a token that will allow us to submit our form. 

Name: Public API Form Submit
Description: Form Submission.
Token duration: Unlimited
Token type: Custom

In Permissions lets give the following access.

| Content  | Permissions   
|----------|:-------------:|
| Lead-Form-Submission | create |

Add your token to your `NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN` variable name in the `.env` file.

Once your environment variables are set you can start your frontend application by running `yarn dev`.
