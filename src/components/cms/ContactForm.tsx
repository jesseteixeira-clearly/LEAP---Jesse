import { useCMS } from '@/context/CmsContentProvider'

import { useSubmitForm } from '@/hooks/submitForm.hook'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingIcon } from '../ui/Icons'

interface ContactField {
  name: string
  label: string
  type: string
  validation?: {
    required: boolean
    minLength?: number
    maxLength?: number
    pattern?: string
  }
  styling: {
    placeholder: string
  }
}

interface ContactFormData {
  [key: string]: string
}

export const ContactForm: React.FC = () => {
  const { getComponent } = useCMS()
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const componentData = getComponent('contact-form')
  const [loading, setLoading] = useState(false)
  const { submitForm } = useSubmitForm()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  if (!componentData?.attributes) return null

  const fields = componentData.attributes.fields || []
  const submission = componentData.attributes.submission || {}

  const clearMessages = () => {
    setErrorMessage('')
    setSuccessMessage('')
  }

  const onSubmit = async (data: ContactFormData) => {
    if (isSubmitting || loading) return
    clearMessages()
    setLoading(true)

    try {
      submitForm(data, submission.method, submission.endpoint)
        .then(result => {
          if (result.success) {
            reset()
            setSuccessMessage(result.success ?? submission.successMessage)
          } else {
            setErrorMessage(result.error ?? submission.errorMessage)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      setErrorMessage(error ?? submission.errorMessage)
      setLoading(false)
    }
  }
  const disabledCta = loading || isSubmitting
  return (
    <section id="contact-form" className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

        <form
          onSubmit={handleSubmit(data => onSubmit(data))}
          method={submission.method}
          className="bg-gray-50 p-8 rounded-lg shadow-md"
        >
          <div className="mb-6">
            {fields.map((field: ContactField) => (
              <>
                <label htmlFor={field.name} className="block text-gray-700 font-medium mb-2">
                  {field.label}
                </label>
                {field.type === 'textArea' ? (
                  <>
                    <textarea
                      {...register(`${field.name}`, {
                        required: field.validation?.required,
                        minLength: field.validation?.minLength ?? 2,
                        maxLength: field.validation?.maxLength ?? 50,
                      })}
                      id={field.name}
                      name={field.name}
                      rows={4}
                      placeholder={field.styling.placeholder}
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors[field.name] && (
                      <span className="text-red-500 text-sm mt-1">
                        Please enter a valid {field.label.toLowerCase()}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      {...register(`${field.name}`, {
                        required: field.validation?.required,
                        minLength: field.validation?.minLength ?? 2,
                        maxLength: field.validation?.maxLength ?? 50,
                        pattern: new RegExp(field.validation?.pattern ?? '.*'),
                      })}
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      placeholder={field.styling.placeholder}
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors[field.name] && (
                      <span className="text-red-500 text-sm mt-1">
                        Please enter a valid {field.label.toLowerCase()}
                      </span>
                    )}
                  </>
                )}
              </>
            ))}
          </div>

          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            disabled={isSubmitting}
          >
            {(disabledCta && <LoadingIcon />) || submission.cta.label.action}
          </button>
        </form>

        {successMessage && (
          <div id="formSuccess" className=" mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {submission.successMessage}
          </div>
        )}

        {errorMessage && (
          <div id="formError" className=" mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}
      </div>
    </section>
  )
}
