import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Form, Row } from 'react-bootstrap'
import axios from 'axios'
import * as yup from 'yup'
import Head from 'next/head'
import { useRouter } from 'next/router.js'

import MetaHeader from '../components/MetaHeader.js'
import NavHeader from '../components/NavHeader.js'
import Footer from '../components/Footer.js'
import Section from '../components/Section.js'
import experienceSelect from '../components/formComponents/experienceSelect.js'
import pricesSelect from '../components/formComponents/pricesSelect.js'
import Specializations from '../components/formComponents/Specializations.jsx'
import SubmitButton from '../components/formComponents/SubmitButton.jsx'
import showToast from '../components/toast/showToast.js'

import seo from '../config/seo'
import analytics from '../lib/analytics'
import routes from '../server/routes.js'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const mentorsUrl = process.env.NEXT_PUBLIC_MENTORS_BACKEND_URL

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'form', 'formErrors', 'toastify'])),
      // Will be passed to the page component as props
    },
  }
}

export default function Bementor() {
  const router = useRouter()
  const { t } = useTranslation(['common', 'form', 'formErrors', 'toastify'])

  const title = `${t('formHeader.header', { ns: 'form' })} | ` + seo.title

  const signupSchema = yup.object({
    name: yup
      .string()
      .min(6, t('nameError', { ns: 'formErrors' }))
      .required(t('requiredError', { ns: 'formErrors' })),
    email: yup
      .string()
      .email(t('emailError', { ns: 'formErrors' }))
      .required(t('requiredError', { ns: 'formErrors' })),
    telegramUsername: yup
      .string()
      .min(4, t('telegramUsernameError', { ns: 'formErrors' }))
      .required(t('requiredError', { ns: 'formErrors' })),
    photoUrl: yup
      .string()
      .url(t('photoUrlError', { ns: 'formErrors' }))
      .required(t('requiredError', { ns: 'formErrors' })),
    job: yup
      .string()
      .min(4, t('jobError', { ns: 'formErrors' }))
      .required(t('requiredError', { ns: 'formErrors' })),
    workplace: yup
      .string()
      .min(4, t('workplaceError', { ns: 'formErrors' }))
      .required(t('requiredError', { ns: 'formErrors' })),
    about: yup
      .string()
      .min(20, t('aboutError', { ns: 'formErrors' }))
      .required(t('requiredError', { ns: 'formErrors' })),
    description: yup
      .string()
      .min(20, t('descriptionError', { ns: 'formErrors' }))
      .required(t('requiredError', { ns: 'formErrors' })),
    specializations: yup
      .array()
      .min(1, t('specializations.minError', { ns: 'formErrors' }))
      .max(5, t('specializations.maxError', { ns: 'formErrors' })),
    competencies: yup
      .string()
      .min(5, t('competenciesError', { ns: 'formErrors' }))
      .required(t('requiredError', { ns: 'formErrors' })),
    linkToCalendar: yup
      .string()
      .url(t('linkToCalendar', { ns: 'formErrors' }))
      .required(t('requiredError', { ns: 'formErrors' })),
    policy: yup.boolean().oneOf([true]),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      telegramUsername: '',
      photoUrl: '',
      job: '',
      workplace: '',
      about: '',
      description: '',
      competencies: '',
      experience: experienceSelect.defaultOption,
      specializations: [],
      price: pricesSelect.defaultOption,
      linkToCalendar: '',
      policy: false,
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const formData = {
          name: values.name,
          email: values.email,
          telegramUsername: values.telegramUsername,
          photoUrl: values.photoUrl,
          job: values.job,
          workplace: values.workplace,
          about: values.about,
          description: values.description,
          experience: values.experience,
          price: values.price,
          specializations: values.specializations,
          competencies: values.competencies,
          linkToCalendar: values.linkToCalendar,
        }

        await axios.post(`${mentorsUrl}${routes.mentorsPath()}`, formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })

        showToast(t('showSuccessToast', { ns: 'toastify' }), 'success')
        return router.push('/')
      } catch (error) {
        console.error(error.message)
      }
    },
  })

  useEffect(() => {
    analytics.event('Visit Bementor Page')
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <MetaHeader customTitle={t('formHeader.header', { ns: 'form' })} />
      </Head>

      <NavHeader className="bg-primary-100" />

      <Section className="bg-primary-100" id="header">
        <div className="text-center py-14 lg:w-3/4 mx-auto">
          <h1>{t('formHeader.header', { ns: 'form' })}</h1>

          <p>
            {t('formHeader.subHeaderTop', { ns: 'form' })}
            <br />
            {t('formHeader.subHeaderBottom', { ns: 'form' })}
          </p>
        </div>
      </Section>

      <div className="container-fluid">
        <div className="row justify-content-center" style={{ backgroundColor: '#fcf8f2' }}>
          <div
            className="formContainer w-50 p-0 border rounded-top rounded-bottom"
            style={{ backgroundColor: 'white' }}
          >
            <h1
              className="formHeader p-3 text-center rounded-top border-bottom"
              style={{ backgroundColor: '#ffffd3' }}
            >
              {t('title', { ns: 'form' })}
            </h1>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Row className="mb-3 pb-3 pl-2 pr-2 pt-3 mx-auto">
                <Form.Group className="col">
                  <Form.Label className="formLabel ml-2">
                    <b>{t('name.nameInput', { ns: 'form' })}</b>
                  </Form.Label>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.name && formik.errors.name}
                      className="rounded-0 shadow-sm"
                    />
                    <label htmlFor="name">{t('name.nameInputLabel', { ns: 'form' })}</label>

                    <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                      {formik.errors.name || null}
                    </Form.Control.Feedback>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="col">
                  <Form.Label className="formLabel ml-2">
                    <b>{t('email.emailInput', { ns: 'form' })}</b>
                  </Form.Label>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      type="email"
                      name="email"
                      id="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.email && formik.errors.email}
                      className="rounded-0 shadow-sm"
                    />
                    <label htmlFor="name">{t('email.emailInputLabel', { ns: 'form' })}</label>

                    <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                      {formik.errors.email || null}
                    </Form.Control.Feedback>
                  </Form.Floating>
                </Form.Group>
              </Row>

              <Row className="mb-3 pb-3 pl-2 pr-2 pt-3 mx-auto">
                <Form.Group className="col">
                  <Form.Label className="formLabel ml-2">
                    <b>{t('telegramUsername.telegramUsernameInput', { ns: 'form' })}</b>
                  </Form.Label>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      type="text"
                      name="telegramUsername"
                      id="telegramUsername"
                      onChange={formik.handleChange}
                      value={formik.values.telegramUsername}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.telegramUsername && formik.errors.telegramUsername}
                      className="rounded-0 shadow-sm"
                    />
                    <label htmlFor="name">
                      {t('telegramUsername.telegramUsernameInputLabel', { ns: 'form' })}
                    </label>

                    <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                      {formik.errors.telegramUsername || null}
                    </Form.Control.Feedback>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="col">
                  <Form.Label className="formLabel ml-2">
                    <b>{t('photoUrl.photoUrlInput', { ns: 'form' })}</b>
                  </Form.Label>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      type="text"
                      name="photoUrl"
                      id="photoUrl"
                      onChange={formik.handleChange}
                      value={formik.values.photoUrl}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.photoUrl && formik.errors.photoUrl}
                      className="rounded-0 shadow-sm"
                    />
                    <label htmlFor="name">{t('photoUrl.photoUrlInputLabel', { ns: 'form' })}</label>

                    <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                      {formik.errors.photoUrl || null}
                    </Form.Control.Feedback>
                  </Form.Floating>
                </Form.Group>
              </Row>

              <Row className="mb-3 pb-3 pl-2 pr-2 pt-3 mx-auto">
                <Form.Group className="col mb-3">
                  <Form.Label className="formLabel ml-2">
                    <b>{t('workplaceInput', { ns: 'form' })}</b>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="workplace"
                    id="workplace"
                    onChange={formik.handleChange}
                    value={formik.values.workplace}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.workplace && formik.errors.workplace}
                    className="rounded-0 shadow-sm"
                  />

                  <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                    {formik.errors.workplace || null}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col mb-3">
                  <Form.Label className="formLabel ml-2">
                    <b>{t('jobInput', { ns: 'form' })}</b>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="job"
                    id="job"
                    onChange={formik.handleChange}
                    value={formik.values.job}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.job && formik.errors.job}
                    className="rounded-0 shadow-sm"
                  />

                  <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                    {formik.errors.job || null}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3 pb-3 pl-5 pr-5">
                <Form.Label className="formLabel ml-2">
                  <b>{t('about.aboutInput', { ns: 'form' })}</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>{t('about.aboutInputLabel', { ns: 'form' })}</Form.Text>
                </div>
                <Form.Control
                  as="textarea"
                  name="about"
                  id="about"
                  onChange={formik.handleChange}
                  value={formik.values.about}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.about && formik.errors.about}
                  style={{ height: '100px' }}
                  className="rounded-0 shadow-sm"
                />

                <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                  {formik.errors.about || null}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 pb-3 pl-5 pr-5">
                <Form.Label className="formLabel ml-2">
                  <b>{t('description.descriptionInput', { ns: 'form' })}</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>
                    {t('description.descriptionTxt1', { ns: 'form' })}
                    <br />
                    {t('description.descriptionTxt2-1', { ns: 'form' })}:{' '}
                    <b>{t('description.descriptionTxt2-2', { ns: 'form' })}</b>
                    <br />— {t('description.descriptionTxt3', { ns: 'form' })}
                    <br />— {t('description.descriptionTxt4', { ns: 'form' })}
                    <br />— {t('description.descriptionTxt5', { ns: 'form' })}
                  </Form.Text>
                </div>
                <Form.Control
                  as="textarea"
                  name="description"
                  id="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.description && formik.errors.description}
                  style={{ height: '100px' }}
                  className="rounded-0 shadow-sm"
                />

                <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                  {formik.errors.description || null}
                </Form.Control.Feedback>
              </Form.Group>

              <Row className="mb-3 pb-3 pl-2 pr-2 pt-3 mx-auto">
                <Form.Group className="col">
                  <Form.Label className="formLabel ml-2">
                    <b>{t('experience.experienceInput', { ns: 'form' })}</b>
                  </Form.Label>

                  <div className="ml-2 pb-2">
                    <Form.Text>{t('experience.experienceInputLabel', { ns: 'form' })}</Form.Text>
                  </div>
                  <Form.Control
                    as="select"
                    name="experience"
                    id="experience"
                    onChange={formik.handleChange}
                    value={formik.values.experience}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.experience && formik.errors.experience}
                    style={{ width: '100px' }}
                    className="rounded-0 shadow-sm"
                  >
                    {experienceSelect.options.map(({ id, experience }) => (
                      <option key={id} value={experience}>
                        {experience}
                      </option>
                    ))}
                  </Form.Control>

                  <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                    {formik.errors.experience || null}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col">
                  <Form.Label className="formLabel ml-2">
                    <b>{t('price.priceHeader', { ns: 'form' })}</b>
                  </Form.Label>

                  <div className="ml-2 pb-2">
                    <Form.Text>{t('price.priceSubHeader', { ns: 'form' })}</Form.Text>
                  </div>
                  <Form.Control
                    as="select"
                    name="price"
                    id="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.price && formik.errors.price}
                    style={{ width: '200px' }}
                    className="rounded-0 shadow-sm"
                  >
                    {pricesSelect.options.map(({ id, price }) => (
                      <option key={id} value={price}>
                        {price}
                      </option>
                    ))}
                  </Form.Control>

                  <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                    {formik.errors.experience || null}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3 pb-3 pl-5 pr-5">
                <Form.Label className="formLabel ml-2">
                  <b>{t('specialization.specializationHeader', { ns: 'form' })}</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>
                    {t('specialization.specializationSubHeader', { ns: 'form' })}
                  </Form.Text>
                </div>

                <Specializations formik={formik} tag="specializations" />
              </Form.Group>

              <Form.Group className="mb-3 pb-3 pl-5 pr-5">
                <Form.Label className="formLabel ml-2">
                  <b>{t('competencies.competenciesHeader', { ns: 'form' })}</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>{t('competencies.competenciesSubHeader', { ns: 'form' })}</Form.Text>
                </div>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    name="competencies"
                    id="competencies"
                    onChange={formik.handleChange}
                    value={formik.values.competencies}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.competencies && formik.errors.competencies}
                    className="rounded-0 shadow-sm"
                  />
                  <label htmlFor="name">
                    {t('competencies.competenciesInputLabel', { ns: 'form' })}
                  </label>

                  <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                    {formik.errors.competencies || null}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <Form.Group className="mb-3 pb-3 pl-5 pr-5">
                <Form.Label className="formLabel ml-2">
                  <b>{t('calendar.calendarHeader', { ns: 'form' })}</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>{t('calendar.calendarSubHeader', { ns: 'form' })}</Form.Text>
                </div>
                <Form.Control
                  type="url"
                  name="linkToCalendar"
                  id="linkToCalendar"
                  onChange={formik.handleChange}
                  value={formik.values.linkToCalendar}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.linkToCalendar && formik.errors.linkToCalendar}
                  className="rounded-0 shadow-sm"
                />

                <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                  {formik.errors.linkToCalendar || null}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 pb-3 pl-5 pr-5">
                <Form.Label className="formLabel ml-2">
                  <b>{t('policy.policyHeader', { ns: 'form' })}</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>
                    {t('policy.policySubHeader1-1', { ns: 'form' })}{' '}
                    <a href="https://getmentor.dev/privacy">
                      {t('policy.policyLink', { ns: 'form' })}
                    </a>{' '}
                    {t('policy.policySubHeader1-2', { ns: 'form' })}
                  </Form.Text>
                </div>
                <Form.Check
                  type="checkbox"
                  id="policy"
                  label={t('policy.policyCheckbox', { ns: 'form' })}
                  onChange={formik.handleChange}
                  value={formik.values.policy}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.policy && formik.errors.policy}
                  className="mt-3 ml-10 pl-10"
                  readOnly
                />

                <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                  {formik.errors.experience || null}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="formLabel text-center p-3 mb-5 rounded-3">
                <SubmitButton text={t('subminButton', { ns: 'form' })} />
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
