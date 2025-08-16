import { colorMap, ColorKey } from '../lib/colorMap'
import AlienCard from './AlienCard'

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
    isLeft?: boolean
    revealDelayMs?: number
}

const ExperienceCard = ({ title, company, companyUrl, description, period, technologies, links, color, isLeft = false, revealDelayMs = 0 }: ExperienceCardProps) => {
    const colors = colorMap[color]

    return (
        <div className="flex items-start md:items-center md:justify-between group">
            {/* Mobile/Tablet Layout */}
            <div className="md:hidden flex items-start w-full">
                <div className={`relative z-10 w-6 h-6 ${colors.bg} rounded-full border-4 border-black mt-2 mr-6 flex-shrink-0 shadow-lg ${colors.shadow} group-hover:${colors.shadowHover} transition-all duration-300`}></div>
                <div className="flex-1">
                    <AlienCard
                        side={isLeft ? 'left' : 'right'}
                        delayMs={revealDelayMs}
                        variant="experience"
                        accentClasses={{ text: colors.text, borderLight: colors.borderLight, borderHover: colors.borderHover, shadow: colors.shadow }}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="px-3 py-1.5 bg-gray-800/60 border border-gray-600/30 rounded-full text-xs text-gray-300 font-medium backdrop-blur-sm">
                                {period}
                            </div>
                            <div className="flex-1 text-right">
                                <h3 className={`text-lg sm:text-xl font-bold ${colors.text} mb-1 hover:${colors.textHover} transition-colors duration-300`}>{title}</h3>
                                {companyUrl ? (
                                    <a href={companyUrl} className={`text-gray-300 hover:${colors.textHover} transition-colors mb-2 block flex items-center justify-end font-medium`}>
                                        {company}
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                ) : (
                                    <p className="text-gray-300 mb-2 font-medium text-right">{company}</p>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 break-words leading-relaxed">{description}</p>
                        <div className="flex gap-2 text-xs mb-4 flex-wrap">
                            {technologies.map((tech, index) => {
                                const techColors = colorMap[tech.color]
                                return (
                                    <span key={index} className={`${techColors.bgLight} ${techColors.text} px-3 py-1.5 rounded-full font-medium border ${techColors.borderLight} hover:${techColors.borderHover} transition-all duration-300 transform hover:scale-105`}>
                                        {tech.name}
                                    </span>
                                )
                            })}
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            {links.map((link, index) => (
                                <a key={index} href={link.url} className={`${colors.text} hover:${colors.textHover} text-sm font-medium transition-all duration-300 flex items-center gap-1 hover:gap-2 break-all`}>
                                    {link.label}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </AlienCard>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between w-full">
                {isLeft ? (
                    <>
                        <div className="w-5/12 text-right pr-8">
                            <AlienCard
                                side={'left'}
                                delayMs={revealDelayMs}
                                variant="experience"
                                accentClasses={{ text: colors.text, borderLight: colors.borderLight, borderHover: colors.borderHover, shadow: colors.shadow }}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="px-3 py-1.5 bg-gray-800/60 border border-gray-600/30 rounded-full text-xs text-gray-300 font-medium backdrop-blur-sm">
                                        {period}
                                    </div>
                                    <div className="flex-1 text-right">
                                        <h3 className={`text-lg sm:text-xl font-bold ${colors.text} mb-1 hover:${colors.textHover} transition-colors duration-300`}>{title}</h3>
                                    </div>
                                </div>
                                {companyUrl ? (
                                    <a href={companyUrl} className={`text-gray-300 hover:${colors.textHover} transition-colors mb-2 block flex items-center justify-end font-medium`}>
                                        {company}
                                        <svg className="w-4 h-4 ml-1 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                ) : (
                                    <p className="text-gray-300 mb-2 font-medium text-right">{company}</p>
                                )}
                                <p className="text-sm text-gray-400 mb-4 break-words leading-relaxed">{description}</p>
                                <div className="flex gap-2 text-xs mb-4 justify-end flex-wrap">
                                    {technologies.map((tech, index) => {
                                        const techColors = colorMap[tech.color]
                                        return (
                                            <span key={index} className={`${techColors.bgLight} ${techColors.text} px-3 py-1.5 rounded-full font-medium border ${techColors.borderLight} hover:${techColors.borderHover} transition-all duration-300 transform hover:scale-105`}>
                                                {tech.name}
                                            </span>
                                        )
                                    })}
                                </div>
                                <div className="flex gap-4 justify-end">
                                    {links.map((link, index) => (
                                        <a key={index} href={link.url} className={`${colors.text} hover:${colors.textHover} text-sm font-medium transition-all duration-300 flex items-center gap-1 hover:gap-2 break-all`}>
                                            {link.label}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </AlienCard>
                        </div>
                        <div className={`relative z-10 w-6 h-6 ${colors.bg} rounded-full border-4 border-black shadow-lg ${colors.shadow} group-hover:${colors.shadowHover} transition-all duration-300`}></div>
                        <div className="w-5/12 pl-8" />
                    </>
                ) : (
                    <>
                        <div className="w-5/12 text-right pr-8" />
                        <div className={`relative z-10 w-6 h-6 ${colors.bg} rounded-full border-4 border-black shadow-lg ${colors.shadow} group-hover:${colors.shadowHover} transition-all duration-300`}></div>
                        <div className="w-5/12 pl-8">
                            <AlienCard
                                side={'right'}
                                delayMs={revealDelayMs}
                                variant="experience"
                                accentClasses={{ text: colors.text, borderLight: colors.borderLight, borderHover: colors.borderHover, shadow: colors.shadow }}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1 text-left">
                                        <h3 className={`text-lg sm:text-xl font-bold ${colors.text} mb-1 hover:${colors.textHover} transition-colors duration-300`}>{title}</h3>
                                    </div>
                                    <div className="px-3 py-1.5 bg-gray-800/60 border border-gray-600/30 rounded-full text-xs text-gray-300 font-medium backdrop-blur-sm">
                                        {period}
                                    </div>
                                </div>
                                {companyUrl ? (
                                    <a href={companyUrl} className={`text-gray-300 hover:${colors.textHover} transition-colors mb-2 block flex items-center font-medium`}>
                                        {company}
                                        <svg className="w-4 h-4 ml-1 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                ) : (
                                    <p className="text-gray-300 mb-2 font-medium text-left">{company}</p>
                                )}
                                <p className="text-sm text-gray-400 mb-4 break-words leading-relaxed">{description}</p>
                                <div className="flex gap-2 text-xs mb-4 justify-start flex-wrap">
                                    {technologies.map((tech, index) => {
                                        const techColors = colorMap[tech.color]
                                        return (
                                            <span key={index} className={`${techColors.bgLight} ${techColors.text} px-3 py-1.5 rounded-full font-medium border ${techColors.borderLight} hover:${techColors.borderHover} transition-all duration-300 transform hover:scale-105`}>
                                                {tech.name}
                                            </span>
                                        )
                                    })}
                                </div>
                                <div className="flex gap-4">
                                    {links.map((link, index) => (
                                        <a key={index} href={link.url} className={`${colors.text} hover:${colors.textHover} text-sm font-medium transition-all duration-300 flex items-center gap-1 hover:gap-2 break-all`}>
                                            {link.label}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </AlienCard>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ExperienceCard 