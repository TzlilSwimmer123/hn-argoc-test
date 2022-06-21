const axios = require('axios')

class hn {
    constructor() {
        this.API_URL = 'https://hacker-news.firebaseio.com/v0/'
        this.TOP_URL = `${this.API_URL}topstories.json`
        this.BEST_URL = `${this.API_URL}beststories.json`
        this.STORY_URL = `${this.API_URL}/item/`
    }

    async prepareTopTen() {
        let stories = await this.getTopTenStoryDetails()
        let result = ""
        for (let story of stories) {
            result += `${story.data.score} -> ${story.data.title} -> ${story.data.url}\n`
        }
        return result
    }
    async prepareTopTenJson() {
        let stories = await this.getTopTenStoryDetails()
        let result = []
        for (let story of stories) {
            result.push({ 
                'score': story.data.score, 
                'title': story.data.title, 
                'url': story.data.url, 
                'by': story.data.by, 
                'comments': `https://news.ycombinator.com/item?id=${story.data.id}`})
        }
        return result
    }

    async printTopTen() {
        let stories = await this.getTopTenStoryDetails()
        for (let story of stories) {
            console.log(` AWS Summit Tel-Aviv 2022 - ${story.data.score} -> ${story.data.title} -> ${story.data.url}`)
        }
    }

    async getTopTenStoryDetails() {
        let stories = await this.getTopTenStoryIds()

        let storyResults = []

        for (let story of stories.values()) {
            storyResults.push(this.getStory(story))
        }

        return await Promise.all(storyResults)
    }

    async getTopTenStoryIds() {
        let res = await axios.get(this.TOP_URL)
        return res.data.slice(0,10)
    }

    async getStory(storyId) {
        return axios.get(`${this.STORY_URL}${storyId}.json`)
    }
}


module.exports = hn