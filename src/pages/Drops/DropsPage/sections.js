import { CONST } from "../../../constants"

class Section {
  constructor(id, title, pageTitle, description, sortBy, filter) {
    this.id = id
    this.title = title
    this.pageTitle = pageTitle
    this.description = description
    this.sortBy = sortBy
    this._filter = filter
  }

  set filter(value) {
    throw Error("Filter is read-only")
  }

  get filter() {
    if (!this._filter) return undefined
    return this._filter
      .replace(":now", Date.now())
      .replace(":dropTimestamp", "dropsAtApproxTimestamp")
  }
}

class SectionManager {
  constructor() {
    this.sections = {}
  }

  addSection(section) {
    const id = section.id
    if (this.sections[id]) {
      throw Error("This section already exists")
    }
    this.sections[id] = section
  }

  list() {
    return Object.values(this.sections)
  }

  get(id) {
    return this.sections[id]
  }
}

const sections = new SectionManager()

sections.addSection(
  new Section(
    "newest",
    "Nowe",
    "Nowe Dropy",
    "Świeżo dodane dropy. Bądź na bieżąco.",
    CONST.BLOG_DROP_NEWEST_ALGOLIA_INDEX
  )
)
sections.addSection(
  new Section(
    "upcoming",
    "Nadchodzące",
    "Nadchodzące Dropy",
    "3... 2... 1... Drop", // XD
    CONST.BLOG_DROP_ALGOLIA_INDEX,
    ":dropTimestamp > :now"
  )
)
sections.addSection(
  new Section(
    "archive",
    "Archiwum",
    "Archiwalne Dropy",
    "Przeglądaj dropy które miały już miejsce i sprawdź czy dostaniesz je u nas na tablicy.",
    CONST.BLOG_DROP_ARCHIVE_ALGOLIA_INDEX,
    ":dropTimestamp < :now"
  )
)

export default sections
