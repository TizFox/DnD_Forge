# https://5e.tools/spells.html
# id="listcontainer"
# id="contentwrapper"


import json
import time

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://dnd5e.wikidot.com"
HEADERS = {"User-Agent": "Mozilla/5.0"}


def get_spell_links() -> list[str]:
    res = requests.get(f"{BASE_URL}/spells", headers=HEADERS)
    soup = BeautifulSoup(res.text, "html.parser")

    links = []
    for a in soup.select("a[href^='/spell:']"):
        href = a["href"]
        if href not in links:
            links.append(href)
    return links


def parse_spell(path: str) -> dict | None:
    url = f"{BASE_URL}{path}"
    res = requests.get(url, headers=HEADERS)
    if res.status_code != 200:
        print(f"  Errore {res.status_code}: {url}")
        return None

    soup = BeautifulSoup(res.text, "html.parser")

    try:
        title = soup.find_all("div", class_="page-title")
        name = path.split(":")[-1] if not title[0].span else title[0].span.string

        content = soup.find("div", id="page-content")
        if not content:
            return None
        paragraphs = content.find_all("p")
        manual = paragraphs[0].string.split(" ", 1)[1]
        level_school = paragraphs[1].string.split(" ")
        castingTime_range_components_duration = list(
            filter(
                lambda x: x[-1] != ":",
                [
                    y.split("-")
                    for y in paragraphs[2]
                    .get_text(separator="-", strip=True)
                    .split("\n")
                ][0],
            )
        )
        description = paragraphs[3].string
        higherLevels = (
            ""
            if not paragraphs[4]
            else paragraphs[4].get_text().split(".", 1)[1].strip()
        )

        level = "0" if level_school[1] == "cantrip" else level_school[0][0]
        school = level_school[0] if level_school[1] == "cantrip" else level_school[1]

        return {
            "manual": manual,
            "name": name,
            "level": level,
            "school": school,
            "castingTime": castingTime_range_components_duration[0],
            "range": castingTime_range_components_duration[1],
            "components": castingTime_range_components_duration[2],
            "duration": castingTime_range_components_duration[3],
            "description": description,
            "higherLevels": higherLevels,
        }
    except:
        print(f"Error: {path.split(':')[-1]}")
        return None


def main():
    print("Recupero lista spell...")
    links = get_spell_links()
    print(f"Trovate {len(links)} spell\n")

    spells = []
    for i, path in enumerate(links):
        name = path.split(":")[-1]
        print(f"[{i + 1}/{len(links)}] {name}")
        spell = parse_spell(path)
        if spell:
            spells.append(spell)
        time.sleep(0.5)  # rispetta il server

    with open("spells.json", "w", encoding="utf-8") as f:
        json.dump(spells, f, indent=2, ensure_ascii=False)

    print(f"\nSalvate {len(spells)} spell in spells.json")


if __name__ == "__main__":
    main()
