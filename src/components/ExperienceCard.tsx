import { colorMap, ColorKey } from '../lib/colorMap'

// Experience Card Component
interface ExperienceCardProps {
    title: string
    company: string
    companyUrl?: string
    description: string
    period: string
    technologies: { name: string; color: ColorKey }[]
    links: { label: string; url: string }[]
    color: ColorKey
    isLeft?: boolean // Kept for prop compatibility, but not used for styling
}

const ExperienceCard = ({ title, company, companyUrl, description, period, technologies, links, color }: ExperienceCardProps) => {
    const colors = colorMap[color]

    return (
        <div className={`group relative w-full bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border ${colors.borderLight} hover:${colors.borderHover} transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${colors.shadow} overflow-hidden`}>
            {/* Gradient Glow */}
            <div className={`absolute top-0 left-0 w-full h-1 ${colors.bg} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div className={`absolute -top-1/2 -left-1/2 w-full h-full ${colors.bg} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`}></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className={`text-xl font-bold ${colors.text} mb-1 group-hover:${colors.textHover} transition-colors duration-300`}>{title}</h3>
                        {companyUrl ? (
                            <a href={companyUrl} target="_blank" rel="noopener noreferrer" className={`text-gray-300 hover:${colors.textHover} transition-colors mb-2 block flex items-center font-medium`}>
                                {company}
                                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        ) : (
                            <p className="text-gray-300 mb-2 font-medium">{company}</p>
                        )}
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <div className={`${colors.bgLight} rounded-full px-4 py-1.5 text-xs ${colors.text} font-semibold border ${colors.borderLight}`}>
                            {period}
                        </div>
                    </div>
                </div>

                <p className="text-sm text-gray-400 mb-5 leading-relaxed">{description}</p>

                <div className="flex gap-2 text-xs mb-5 flex-wrap">
                    {technologies.map((tech, index) => {
                        const techColors = colorMap[tech.color]
                        return (
                            <span key={index} className={`${techColors.bgLight} ${techColors.text} px-3 py-1.5 rounded-full font-medium border ${techColors.borderLight} transition-all duration-300`}>
                                {tech.name}
                            </span>
                        )
                    })}
                </div>

                <div className="flex gap-4 flex-wrap border-t border-gray-700/50 pt-4">
                    {links.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`${colors.text} hover:${colors.textHover} text-sm font-medium transition-all duration-300 flex items-center gap-1.5 hover:gap-2.5`}>
                            {link.label}
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExperienceCard 