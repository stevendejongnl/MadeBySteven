import {expect, fixture, html} from '@open-wc/testing'
import {getPart} from '../../helpers/testing'

import { Repository } from './made-a-github-repository.interface.js'
import { MadeAGithubRepository } from './made-a-github-repository.js'
import './made-a-github-repository.js'

const repository: Repository = {
  id: 1,
  name: 'Some Awesome Repo',
  description: 'Some Description',
  html_url: 'http://localhost/Github-repo-url',
  languages_url: 'http://localhost/url-to-languages-api',
  stargazers_count: 9999999,
  stargazers_url: 'url to stargazers',
  updated_at: '2023-05-27T16:38:18Z'
}

describe('Made by Steven', () => {
  let component: MadeAGithubRepository
  let part: Element
  beforeEach(async () => {
    component = await fixture(html`<made-a-github-repository .repository="${repository}"></made-a-github-repository>`)
    part = getPart(component)
  })
  it('renders', () => expect(component).to.be.instanceOf(MadeAGithubRepository))
  it('renders repository data correctly', () => expectRepositoryRenderedCorrectly(part))
})

const expectRepositoryRenderedCorrectly = (part: Element): void => {
  const title = part.querySelector('.title')
  expect(title.textContent.trim()).to.equal(repository.name)
  expect(title.getAttribute('href')).to.equal(repository.html_url)

  const description = part.querySelector('.description')
  expect(description.textContent.trim()).to.equal(repository.description)

  // const languages = part.querySelector('.languages')
  // Need to make a fetch adapter for testing.

  const stars = part.querySelector('.stars')
  expect(parseInt(stars.textContent.trim())).to.equal(repository.stargazers_count)
}
