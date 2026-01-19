import { Shield, CreditCard, Headphones, Award, LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Your bookings are safe with us. Licensed travel agency in Chhattisgarh.'
    },
    {
      icon: CreditCard,
      title: 'Easy EMI Options',
      description: 'Travel now, pay later with flexible EMI plans via Razorpay.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our Raipur-based team is always ready to help you in Hindi/English.'
    },
    {
      icon: Award,
      title: 'Best Price Guarantee',
      description: 'We match the best prices and offer exclusive deals for CG residents.'
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Saarth Holidays?
          </h2>
          <p className="text-xl text-gray-600">
            Chhattisgarh&apos;s most trusted travel partner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}