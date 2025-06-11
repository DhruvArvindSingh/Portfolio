import { colorMap, ColorKey } from '../lib/colorMap'

// Project Card Component
interface ProjectCardProps {
    title: string
    subtitle: string
    description: string
    year: string
    technologies: { name: string; color: ColorKey }[]
    links: { label: string; url: string }[]
    color: ColorKey
    isLeft?: boolean
}

const ProjectCard = ({ title, subtitle, description, year, technologies, links, color, isLeft = false }: ProjectCardProps) => {
    const colors = colorMap[color]

    return (
        <div className="flex items-start md:items-center md:justify-between group">
            {/* Mobile/Tablet Layout */}
            <div className="md:hidden flex items-start w-full">
                <div className={`relative z-10 w-6 h-6 ${colors.bg} rounded-full border-4 border-black mt-2 mr-6 flex-shrink-0 shadow-lg ${colors.shadow} group-hover:${colors.shadowHover} transition-all duration-300`}></div>
                <div className="flex-1">
                    <div className={`bg-gray-900/90 backdrop-blur-md p-4 sm:p-6 rounded-xl border ${colors.borderLight} hover:${colors.borderHover} transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl ${colors.shadow}`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h3 className={`text-lg sm:text-xl font-bold ${colors.text} mb-1 hover:${colors.textHover} transition-colors duration-300`}>{title}</h3>
                                <p className="text-gray-300 mb-2 font-medium">{subtitle}</p>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <div className={`${colors.bgLight} rounded-full px-3 py-1 text-xs ${colors.text} font-semibold border ${colors.borderLight}`}>
                                    {year}
                                </div>
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
                                <a key={index} href={link.url} className={`${colors.text} hover:${colors.textHover} text-sm font-medium transition-all duration-300 flex items-center gap-1 hover:gap-2`}>
                                    {link.label}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between w-full">
                {isLeft ? (
                    <>
                        <div className="w-5/12 text-right pr-8">
                            <div className={`bg-gray-900/90 backdrop-blur-md p-4 sm:p-6 rounded-xl border ${colors.borderLight} hover:${colors.borderHover} transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl ${colors.shadow}`}>
                                <h3 className={`text-xl font-bold ${colors.text} mb-2 hover:${colors.textHover} transition-colors duration-300`}>{title}</h3>
                                <p className="text-gray-300 mb-2 font-medium">{subtitle}</p>
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
                                        <a key={index} href={link.url} className={`${colors.text} hover:${colors.textHover} text-sm font-medium transition-all duration-300 flex items-center gap-1 hover:gap-2`}>
                                            {link.label}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={`relative z-10 w-6 h-6 ${colors.bg} rounded-full border-4 border-black shadow-lg ${colors.shadow} group-hover:${colors.shadowHover} transition-all duration-300`}></div>
                        <div className="w-5/12 pl-8">
                            <div className="text-sm text-gray-400">
                                <div className={`${colors.bgLight} rounded-full px-4 py-2 inline-block font-semibold ${colors.text} border ${colors.borderLight}`}>
                                    {year}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-5/12 text-right pr-8">
                            <div className="text-sm text-gray-400">
                                <div className={`${colors.bgLight} rounded-full px-4 py-2 inline-block font-semibold ${colors.text} border ${colors.borderLight}`}>
                                    {year}
                                </div>
                            </div>
                        </div>
                        <div className={`relative z-10 w-6 h-6 ${colors.bg} rounded-full border-4 border-black shadow-lg ${colors.shadow} group-hover:${colors.shadowHover} transition-all duration-300`}></div>
                        <div className="w-5/12 pl-8">
                            <div className={`bg-gray-900/90 backdrop-blur-md p-6 rounded-xl border ${colors.borderLight} hover:${colors.borderHover} transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl ${colors.shadow}`}>
                                <h3 className={`text-xl font-bold ${colors.text} mb-2 hover:${colors.textHover} transition-colors duration-300`}>{title}</h3>
                                <p className="text-gray-300 mb-2 font-medium">{subtitle}</p>
                                <p className="text-sm text-gray-400 mb-4 break-words leading-relaxed">{description}</p>
                                <div className="flex flex-wrap gap-2 text-xs mb-4">
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
                                        <a key={index} href={link.url} className={`${colors.text} hover:${colors.textHover} text-sm font-medium transition-all duration-300 flex items-center gap-1 hover:gap-2`}>
                                            {link.label}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProjectCard 