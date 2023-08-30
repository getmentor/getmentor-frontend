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

const mentorsUrl = process.env.NEXT_PUBLIC_MENTORS_BACKEND_URL

export default function Bementor() {
  const title = 'Стань частью нашей команды | ' + seo.title
  const router = useRouter()

  const signupSchema = yup.object({
    name: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
    email: yup.string().email('Неправильный формат email').required('Обязательное поле'),
    telegramUsername: yup.string().min(4, 'Не менее 4 символов').required('Обязательное поле'),
    photoUrl: yup.string().url('Должна быть ссылкой').required('Обязательное поле'),
    job: yup.string().min(4, 'Не менее 4 символов').required('Обязательное поле'),
    workplace: yup.string().min(4, 'Не менее 4 символов').required('Обязательное поле'),
    about: yup.string().min(20, 'Не менее 20 символов').required('Обязательное поле'),
    description: yup.string().min(20, 'Не менее 20 символов').required('Обязательное поле'),
    specializations: yup
      .array()
      .min(1, 'Минимум 1 специализация')
      .max(5, 'Не более 5 специализаций'),
    competencies: yup.string().min(5, 'Не менее 4 символов').required('Обязательное поле'),
    linkToCalendar: yup.string().url('Должна быть ссылкой').required('Обязательное поле'),
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

        showToast('Вы успешно создали анкету', 'success')
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
        <MetaHeader customTitle="Стань частью нашей команды" />
      </Head>

      <NavHeader className="bg-primary-100" />

      <Section className="bg-primary-100" id="header">
        <div className="text-center py-14 lg:w-3/4 mx-auto">
          <h1>Стань частью нашей команды</h1>

          <p>
            Помогать другим – почётно и круто. Спасибо, что хотите этим заниматься.
            <br />
            Заполните форму ниже, и мы обязательно рассмотрим вашу заявку как можно скорее.
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
              Стать ментором
            </h1>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Row className="mb-3 pb-3 pl-2 pr-2 pt-3 mx-auto">
                <Form.Group className="col">
                  <Form.Label className="formLabel ml-2">
                    <b>Имя и фамилия</b>
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
                    <label htmlFor="name">Отобразится в вашей карточке</label>

                    <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                      {formik.errors.name || null}
                    </Form.Control.Feedback>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="col">
                  <Form.Label className="formLabel ml-2">
                    <b>Электронная почта</b>
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
                    <label htmlFor="name">На неё мы пришлём приглашение</label>

                    <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                      {formik.errors.email || null}
                    </Form.Control.Feedback>
                  </Form.Floating>
                </Form.Group>
              </Row>

              <Row className="mb-3 pb-3 pl-2 pr-2 pt-3 mx-auto">
                <Form.Group className="col">
                  <Form.Label className="formLabel ml-2">
                    <b>Ник в Telegram (без @)</b>
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
                    <label htmlFor="name">Чтобы наш бот присылал заявки</label>

                    <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                      {formik.errors.telegramUsername || null}
                    </Form.Control.Feedback>
                  </Form.Floating>
                </Form.Group>

                <Form.Group className="col">
                  <Form.Label className="formLabel ml-2">
                    <b>Фото для профиля</b>
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
                    <label htmlFor="name">Лучше ту, где вы по центру (не более 2mb)</label>

                    <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                      {formik.errors.photoUrl || null}
                    </Form.Control.Feedback>
                  </Form.Floating>
                </Form.Group>
              </Row>

              <Row className="mb-3 pb-3 pl-2 pr-2 pt-3 mx-auto">
                <Form.Group className="col mb-3">
                  <Form.Label className="formLabel ml-2">
                    <b>Место работы</b>
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
                    <b>Должность</b>
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
                  <b>Расскажите о себе</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>
                    Желательно два-три абзаца: где работали, что интересует в профессиональном поле,
                    каких методик в менторстве придерживаетесь
                  </Form.Text>
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
                  <b>С чем вы можете помочь?</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>
                    Лучше разделить текст на пункты
                    <br />
                    Например: <b>Помогу Senior-разработчикам и лидерам команд</b> <br />—
                    разобраться в Kubernetes
                    <br />— наладить процессы в команде
                    <br />— выбрать оптимальную стратегию для развития стартапа
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
                    <b>Опыт</b>
                  </Form.Label>

                  <div className="ml-2 pb-2">
                    <Form.Text>Сколько лет вы в профессии?</Form.Text>
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
                    <b>Стоимость консультации</b>
                  </Form.Label>

                  <div className="ml-2 pb-2">
                    <Form.Text>Во сколько вы оцениваете час консультации?</Form.Text>
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
                  <b>Специализация</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>Выберите не более 5 тегов, в чем вы сильны</Form.Text>
                </div>

                <Specializations formik={formik} tag="specializations" />
              </Form.Group>

              <Form.Group className="mb-3 pb-3 pl-5 pr-5">
                <Form.Label className="formLabel ml-2">
                  <b>Навыки и технологии</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>
                    Перечислите через запятую навыки, по которым хотите консультировать
                  </Form.Text>
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
                  <label htmlFor="name">Например: JavaScript, React, Leadership, Code Review</label>

                  <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
                    {formik.errors.competencies || null}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Form.Group>

              <Form.Group className="mb-3 pb-3 pl-5 pr-5">
                <Form.Label className="formLabel ml-2">
                  <b>Ссылка на календарь</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>
                    Укажите ссылку на ваш календарь (например Calendly.com). Тогда соискатели смогут
                    записаться к вам на встречу
                  </Form.Text>
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
                  <b>Соглашение с политикой конфиденциальности</b>
                </Form.Label>

                <div className="ml-2 pb-2">
                  <Form.Text>
                    Нажимая на кнопку, вы даёте согласие на обработку персональных данных и
                    соглашаетесь c{' '}
                    <a href="https://getmentor.dev/privacy">политикой конфиденциальности</a> нашего
                    сайта
                  </Form.Text>
                </div>
                <Form.Check
                  type="checkbox"
                  id="policy"
                  label="Соглашаюсь"
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
                <SubmitButton text="Отправить заявку" />
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
