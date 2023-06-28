"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { getStrapiURL } from "../utils/api-helpers";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is equired"),
  message: Yup.string().required("Message is required"),
  // privacyPolicy: Yup.boolean().oneOf([true], 'Privacy Policy must be accepted'),
});

const Contact = () => {
  const [agreed, setAgreed] = useState(false);

  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      // privacyPolicy: false,
    },
    validationSchema: ContactFormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: async (values, {resetForm}) => {
      const res = await fetch(getStrapiURL() + "/api/contact-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: values }),
      });
      if(res.status === 200) {
        Swal.fire({
          icon:'success',
          text:'Your message has been sent!',
        })
        resetForm();
      }else{
        Swal.fire({

          title:'Oops...',
          text:'Something went wrong!',
          icon:'error'
        })
      }

    },
  });


  return (
    <div className=" bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact sales
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                autoComplete="given-name"
                placeholder={
                  formik.errors.name ? formik.errors.name : "Enter your name"
                }
                className={classNames(
                  formik.errors.name ? "ring-red-600" : "",
                  formik.errors.name
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-400",
                  "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                )}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                autoComplete="email"
                placeholder={
                  formik.errors.email ? formik.errors.email : "Enter your email"
                }
                className={classNames(
                  formik.errors.email ? "ring-red-600" : "",
                  formik.errors.email
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-400",
                  "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                )}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                rows={4}
                placeholder={
                  formik.errors.message
                    ? formik.errors.message
                    : "Enter your message"
                }
                className={classNames(
                  formik.errors.message ? "ring-red-600" : "",
                  formik.errors.message
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-400",
                  "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                )}
              />
            </div>
          </div>
          {/* <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={formik.values.privacyPolicy}
                onChange={value=>formik.setFieldValue("privacyPolicy", value)}
                className={classNames(
                  formik.values.privacyPolicy ? "bg-indigo-600" : "bg-gray-200",
                  formik.errors.privacyPolicy ? "ring-red-600" : "",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      formik.values.privacyPolicy  ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  privacy&nbsp;policy
                </a>
                .
              </Switch.Label>
            </Switch.Group> */}
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
