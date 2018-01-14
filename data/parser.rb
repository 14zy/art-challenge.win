require "json"

impressionism = [2, 3, 9, 16, 17, 21, 30, 36, 49, 53, 57, 60, 61, 69, 77, 84, 94, 96];
renaissance = [24, 35, 39, 41, 42, 45, 50, 55, 87, 89, 90, 91, 92, 95, 98, 100, 101, 104, 106, 108, 110, 111, 112, 114];
realism = [5, 8, 18, 25, 37, 47, 48, 58, 85, 113, 116, 117];
russian = [3, 4, 5, 6, 8, 10, 11, 12, 13, 16, 19, 20, 23, 25, 26, 27, 37, 38, 44, 47, 48, 76, 81, 84, 85, 86, 103, 105, 107, 113, 115];
french = [2, 9, 17, 30, 36, 40, 49, 53, 57, 58, 61, 64, 65, 69, 70, 73, 75, 77, 93, 94, 96, 97];
#armenian = [117, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133 ,134, 135];
popular = [1, 4, 7, 9, 14, 15, 17, 19, 21, 22, 24, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 39, 40, 41, 42, 43, 45, 46, 49, 50, 53, 54, 55, 57, 58, 61, 62, 63, 69, 73, 75, 77, 79, 80, 82, 83, 94, 95, 112, 118];

quest = french
mylang = "ru"
questFile = "quests/#{mylang}/french.json";


## Берем всю инфу по текущему языку из CouchDB
lang = "en";
langDB = JSON.parse `curl -X GET http://178.62.133.139:5994/lang/#{lang}`

langDBMY = JSON.parse `curl -X GET http://178.62.133.139:5994/lang/#{mylang}`


startText = "{\"paintersDB\": ["
endText = "]}"


File.open("#{questFile}", 'a+') do |file|
    file.write startText
end

##Проходимся по всем художникам
quest.each do |n|

  ## Берем инфу по художнику из CouchDB
  painter = JSON.parse `curl -X GET http://178.62.133.139:5994/painters/#{n}`

  ## Обрабатываем немного
  #description =  painter["bio"][lang].sub("<p>","")[0..150].gsub(/\s\w+\s*$/, '...')

  painterName = langDBMY['painters'][painter['_id']]

  painterNations = []
  painter["nationality"].each do |nationality|
    nation = langDB['nation'][nationality];
    if nation == "Italian"
      nation = "Italy"
    end
    if nation == "Russian"
      nation = "Russia"
    end
    if nation == "Armenian"
      nation = "Armenia"
    end
    if nation == "French"
      nation = "France"
    end
    if nation == "Mexican"
      nation = "Mexico"
    end
    if nation == "Belgian"
      nation = "Belgium"
    end
    if nation == "Spanish"
      nation = "Spain"
    end
    if nation == "American"
      nation = "USA"
    end
    if nation == "Dutch"
      nation = "Netherlands"
    end
    if nation == "Austrian"
      nation = "Austria"
    end
    if nation == "Flemish"
      nation = "Netherlands"
    end
    if nation == "German"
      nation = "Germany"
    end
    if nation == "British"
      nation = "United-Kingdom"
    end
    if nation == "Jewish"
      nation = "Israel"
    end
    if nation == "Belarusian"
      nation = "Belarus"
    end
    if nation == "Czech"
      nation = "Czech-Republic"
    end
    if nation == "Greek"
      nation = "Grecee"
    end
    if nation == "Norwegian"
      nation = "Norway"
    end
    if nation == "Ukrainian"
      nation = "Urkaine"
    end
    if nation == "Swiss"
      nation = "Switzerland"
    end
    painterNations.push(nation)
  end

  painterGenres = []
  painter["genre"].each do |genre|
    painterGenres.push(langDB['genre'][genre])
  end

  # print painter["id"]
  # print painter["name"]
  # print painter["years"]
  # print painterNations
  # print description
  # print painter["paintings"].count


  data = %{{"id": #{painter["id"]},"name": "#{painterName}", "years": "#{painter["years"]}","nationality": #{painterNations},"paintings": #{painter["paintings"].count}},}

  File.open("#{questFile}", 'a+') do |file|
      file.write data
  end

end

File.open("#{questFile}", 'a+') do |file|
    file.write endText
end
