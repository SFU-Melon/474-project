INSERT INTO tags (name) VALUES
(
    'First Post'
),
(
    'Question'
),
(
    'Help'
),
(
    'Tips'
),
(
    'Suggestion'
);


INSERT INTO plantdiseases (diseaseName) VALUES 
('anthracnose'),
('basal Rot'),
('botrytis blight'),
('blossom-end rot'),
('crown gall'),
('colletotrichum fruit rot'),
('celery mosaic'),
('cercospora leaf blight'),
('charcoal rot'),
('damping-off'),
('downy mildew'),
('early blight'),
('fusarium wilt'),
('late blight'),
('powdery mildew'),
('soft rot'),
('southern blight'),
('yellow vein mosaic disease'),
('phomopsis fruit rot'),
('verticillium wilt'),
('rose rosette'),
('pythium root rot'),
('stem and bulb nematode'),
('scale tip rot'),
('leaf scorch');


/* Insert 10 plants into plants table */
INSERT INTO plants (sciname, comname, description, plantinstr, growinstr, careinstr, hardiness, exposure, waterNeed, plantphoto) VALUES 
(
    'Rosa cvs.', 


    'Rose', 


    'There is a rose for every garden situation and need, from climbers to adorn a trellis, to miniatures for containers, to long-stemmed types for bouquets. Because of this variety, it''s important to choose carefully. If you are looking for the familiar rose bush, consider hybrid teas, floribundas, or shrub roses. Hybrid teas are tall, long-stemmed roses ideal for cutting. Floribundas are shorter and bloom more freely, setting clusters of blossoms rather than a single bloom on a stem. Both these require regular maintenance for optimum performance. Shrub roses (sometimes called landscape roses), on the other hand, require somewhat less attention, adapt more readily to a wider range of conditions, and offer more disease resistance.',


    'Plant in early spring or fall, depending on your location. Space plants 2 to 3 feet apart, depending on the variety. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost. In regions with cold (below 0F) winters, plant grafted roses so the graft union (which appears as a bulge near the base of the stem) is 1 to 2 inches below the soil line. In warm regions, the graft should be a few inches above the soil line.

For container-grown plants, dig a hole twice the diameter of the pot the plant is in. Carefully remove the plant from its container and place it in the hole. Carefully fill in around the root ball and firm the soil gently. For bare-root roses, dig a hole 12 to 18 inches deep and wide. The hole should be large enough that all the roots can be spread out without touching the sides of the hole. Mound a cone of soil in the center of the hole. Trim off any broken roots, then place the rose in the hole, spreading the roots around the soil mound. Fill the hole half full with soil and water it well to settle the soil and eliminate air pockets. Let the water drain, then fill the remainder of hole with soil and water thoroughly.', 


    'Ideally, roses should be grown in sunny and open locations, with good air circulation at the base of the plant, in rich and well-draining soil. Some roses, notably the old ramblers and the modern hybrid musks, can tolerate some shade in any zone and may even prefer shade in the hottest zones.

Roses require 1-2 inches of water a week to thrive. In dry climates, this water has to be supplied by the gardener, and although overhead watering was once discouraged, it is the logical choice. The water supplied by a gardener supplements rain, which falls from overhead. Overhead watering keeps the foliage and blooms clean, retards powdery mildew, and repels some pests.',


    'Apply a layer of compost under the shrub each spring, followed by a 2-inch layer of mulch to retain moisture and control weeds, keeping mulch a few inches away from the stems. Water plants during the summer if rainfall is less than 1 inch per week. Pruning techniques vary with the type of rose.',


    'Zone 5: (-29 to -23 C)',


    'Full sun',


    'Moderate',


    'https://garden.org/pics/2020-06-09/AnnKNCalif/e0ab4e.jpg'
),

(
    'Daucus carota subsp. sativus', 


    'Carrot', 


    'Carrot is an edible, biennial herb in the family Apiaceae grown for its edible root. The carrot plant produces a rosette of 8–12 leaves above ground and a fleshy conical taproot below ground. The plant produces small (2 mm) flowers which are white, red or purple in color. The root can grow to between 5 and 50 cm (2.0–20 in) long and reach 5 cm (2.0 in) in diameter. The foliage of the plant can reach a height of 150 cm (59.1 in) when in flower. The carrot plant can be annual or biennial and may also be referred to as wild carrot. The plant is believed to have originated in Europe or the Western Mediterranean.',


    'To prolong the harvest, stagger plantings at three-week intervals as the soil temperatures rise. Work the carrot seedbed well with a tiller or hoe to break up any soil clumps. Remove all rocks and stones. Sprinkle a thin layer of wood ashes over the seedbed to add potassium to the soil for sweeter carrots. Work the ashes into the top 4 inches of the bed. Then rake the beds smooth. Make furrows 1/4 inch deep, spaced 4 inches apart. Put a 1/4 inch layer of sifted compost or peat moss in the bottom of each furrow and sow the seeds, about 3 per inch, on top. Cover with a 1/2 inch layer of the same material. Lightly mulch the seedbed to retain moisture and prevent soil crusting.',

    
    'Select a site with full sun and deep, well-drained soil. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

Carrots are generally ready for harvest in two to three months, when they are about 1/2 inch in diameter. Leave them in the ground until you need them. Drench the bed with water for easy harvesting. Pull the carrots by grabbing the greens at their crowns and gently tugging with a twisting motion. Harvest carrots for the root cellar after the first hard frost but before the ground freezes.',
    

    'Thin carrots to 3 inches apart. Weed carefully and cultivate lightly near the plants. Add mulch about six weeks after sowing to prevent exposing the roots to the sun, which gives them a bitter taste. Water plants during the summer if rainfall is less than 1 inch per week. Carrots are rarely bothered by pests. Contact your local county extension office for controls of common carrot pests, such as wireworms.',


    'Zone 3: (-40 to -34 C)',


    'Full sun',


    'Moderate',


    'https://garden.org/pics/2021-01-13/farmerdill/089656.jpg'
),

(
    'Apium graveolens', 


    'Celery', 


    'Celery is an aromatic biennial plant in the family Apicaceae grown primarily for its stalk and taproot which are used as vegetables. The rhombic leaves of the celery plant grow in a rosette and are 3–6 cm (1.2–2.4 in) long and 2–4 cm (0.8–1.6 in) broad on a branched central stem which is highly ribbed. The plant produces creamy white flowers in dense umbels (an umbrella of short flower stalks) and produces broad oval seeds 1.5–2 mm (<0.1 in) long and wide. Celery is a biennial plant that is commonly grown as an annual and it can reach a height of about 1 m. Celery may also be referred to as celeriac which is the name given to the root and is believed to have originated in the Eastern Mediterranean.',
    

    'Presoak seeds to speed germination, whether you''re starting them indoors or sowing directly in the garden. If starting indoors, sow seeds indoors in small pots or flats. Move to individual containers when they are 2 inches tall. Set out transplants 8 to 10 inches apart in rows 10 inches apart a week or so before your last spring frost date. In areas with a long growing season, sow seeds in the garden at a depth of 1/8 inch in rows 30 to 36 inches apart after soil temperature reaches 60 degrees F.',

    
    'Select a site with full sun and well-drained soil. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

Start harvesting outer stalks when they are 6 to 8 inches tall. Harvest stalks in fall as needed before the ground freezes. Celery can tolerate light frosts.',


    'Thin direct-seeded celery plants to stand 8 to 10 inches apart when they''re 4 to 5 inches tall. Apply a heavy layer of mulch immediately after planting and provide a regular supply of water. Celery is a heavy feeder, so you may want to fertilize plants with compost tea or side-dress plants with rich compost several times during the growing season. Blanch varieties that require it when the plants are 12 inches tall. Contact your local county extension office for controls of common celery pests, such as earwigs.',


    'Zone 4: (-34 to -29 C)',


    'Full sun',
    

    'High',


    'https://images.ctfassets.net/3s5io6mnxfqz/2WJ9a10P27IeETZ2a11l0A/d4779f256fa2dd6d179de67077dbc0b5/AdobeStock_298730847.jpeg'
),

(
    'Solanum melongena', 


    'Eggplant', 


    'Eggplant is a tropical, herbaceous, perennial plant, closely related to tomato, in the family Solanaceae which is grown for its edible fruit. The plants has a branching stem and simple, long, flat. coarsely lobed leaves which are green in color and are arranged alternately on the branches. The leaves can measure 10 to 20 cm (4–8 in) long and 5 to 10 cm (2–4 in) broad. The plant produces purple flowers which are 3–5 cm (1.2–2.0 in) in diameter. The fruit is a large, fleshy ovoid berry which can reach 40 cm (15.7 in) in length, with glossy smooth skin and numerous small seeds. The color of the fruit is variable and can be white, green, yellow, purple or black. Eggplants can reach up to 1.5 m (4.9 ft) in height and although they are perennial plants, they are most commonly grown as annuals. Eggplant may also be referred to as aubergine or guinea squash and originates from the Indian subcontinent.',


    'Start plants indoors in flats or peat pots about 2 months before the soil warms up in your region, or buy nursery transplants just before planting. Cover planting beds with black plastic to warm heavy clay soils. Set out the transplants when all spring frost danger is past, spacing plants 18 to 24 inches apart.',


    'Select a site with full sun and fertile, well-drained soil. repare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

Most eggplants can be harvested when they are 4 to 5 inches long. The skin should be shiny; dull skin is a sign that the eggplant is overripe. Use a sharp knife and cut the eggplant from the plant, leaving at least 1 inch of stem attached to the fruit.',


    'Add an organic mulch to retain moisture and control weeds after the soil has completely warmed up, about 1 month after setting out transplants. Water plants during the summer if rainfall is less than 1 inch per week. Contact your local County Extension office for controls of common eggplant pests such as flea beetles, Colorado potato beetles, and tomato hornworms.',


    'Zone 9: (-7 to -1 C)',


    'Full sun',


    'Moderate',


    'https://www.nature-and-garden.com/wp-content/uploads/sites/4/2018/10/eggplant.jpg'
),

(
    'Solanum lycopersicum', 


    'Tomato', 


    'Tomato is an herbaceous annual in the family Solanaceae grown for its edible fruit. The plant can be erect with short stems or vine-like with long, spreading stems. The stems are covered in coarse hairs and the leaves are arranged spirally. The tomato plant produces yellow flowers, which can develop into a cyme of 3–12, and usually a round fruit (berry) which is fleshy, smoothed skinned and can be red, pink, purple, brown, orange or yellow in color. The tomato plant can grow 0.7–2 m (2.3–6.6 ft) in height and as an annual, is harvested after only one growing season. Tomato may also be referred to as love apple and originates from South America.',


    'If you don''t purchase plants, start seeds indoors in flats or pots 6 to 7 weeks before the average last frost date, and set out transplants when the soil is warm and all danger of frost is past. Set up trellises, cages, or stakes at planting time. Dig planting holes 18 to 24 inches apart if you plan to stake or trellis the crops, 36 to 48 inches apart if the plants aren''t trained. Pinch off two or three of the lower branches on the transplant and set the root ball of the plant well into the hole until the remaining lowest leaves are just above the soil surface. The plant will form additional roots along the buried stem. Water generously and keep the plants well watered for a few days.',


    'Select a site with full sun and well-drained soil. In very hot climates, light afternoon shade may help prevent blossom drop. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

For best flavor, harvest tomatoes when they are firm and fully colored. Fruits will continue to ripen if you pick them when they are half-ripe and bring them indoors, but the flavor is often better if you allow fruits to ripen on the vine.',


    'Provide an even supply of water all season. If staking or trellising, prune suckers to allow one or two central stems to grow on staked plants, two or three central stems for trellis systems. Apply a thick layer of organic mulch 4 or 5 weeks after transplanting. Contact your local County Extension office for controls of common tomato insect pests such as tomato hornworms and whiteflies.',


    'Zone 2: (-46 to -40 C)',


    'Full sun',


    'High',


    'https://edge.bonnieplants.com/www/tiny/uploads/20200810204147/BONNIE_tomatoes_iStock-481349128-1800px.jpg'
),

(
    'Abelmoschus esculentus', 


    'Okra',


    'Okra is an herbaceous annual plant in the family Malvaceae which is grown for its edible seed pods. Okra plants have small erect stems that can be bristly or hairless with heart-shaped leaves. The leaves are 10–20 cm (4–8 in) long with 5–7 lobes The plant produces flowers with five white to yellow petals which are 4–8 cm (1.6–3.1 in) in diameter. The seed pod is a capsule up to 25 cm (10 in) long, containing numerous seeds. Okra can grow 1.2–1.8 m (4–6 ft) tall and as an annual plant, survives only one growing season. Okra may also be referred to as lady''s fingers and is believed to have originated in Ethiopia.',


    'In warm regions, plant okra directly in the garden when the nights stay above 55 degrees F and the soil has warmed to 65 degrees F to 70 degrees F. In northern areas, start seeds indoors in peat pots several weeks before the soil warms up. Or direct seed through black plastic and cover the rows with plastic tunnels to hold in the heat. To hasten germination, soak seeds overnight in tepid water or freeze them to crack their coats. Sow seeds 1/2 to 1 inch deep, 3 to 4 inches apart. Set out transplants to stand 1 to 2 feet apart in rows 3 to 4 feet apart.',


    'Select a site with full sun, preferably on a southern slope for maximum warmth, and well-drained soil. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

The first pods will be ready in 50 to 60 days. Harvest the pods when still immature (2 to 3 inches long). Pick at least every other day to encourage production. Wear gloves and long sleeves to avoid coming in contact with the irritating spines on the leaves and pods. Use a knife to cut the stem just above the cap.',


    'When the seedlings are about 3 inches tall, thin to stand 1 to 2 feet apart. Provide at least 1 inch of water per week; more in hot, arid regions. When plants are young, cultivate lightly to eliminate weeds. Mulch heavily (4 to 8 inches) to keep weeds down and conserve moisture. Side-dress plants with rich compost. Side-dress three times: after thinning, when the first pods begin to develop, and at least once midway through the growing season. Contact your local County Extension office for controls of common okra pests such as flea beetles.',


    'Zone 9: (-7 to -1 C)',


    'Full sun',


    'Moderate',


    'https://gardenseason.com/wp-content/uploads/2020/06/Lady-Fingers-or-Okra-vegetable-on-plant-in-farm-_-growing-okra-_-ss-_-featured.jpg'
),

(
    'Capsicum annuum Group', 


    'Bell Pepper',


    'Bell peppers are a cultivar group of annual or perennial plants in the family Solanaceae grown for their edible fruits. Bell pepper plants are short bushes with woody stems that grow brightly colored fruits. The alternating leaves are elliptical, smooth edged, and come to a distinct point. The plant produces white or purple bell-shaped flowers which are 2.5 cm (1 in) in diameter. Red, yellow, purple, or brown fruit are produced each season about 3-6 weeks after flowering. Pepper plants can grow 1 m (3.3 ft) tall and are usually grown as annuals in temperate regions for only one growing season. Bell pepper may be referred to as red pepper, yellow pepper or green pepper and is believed to have originated in Central and South America.',


    'Plan to set out home grown or purchased transplants after the last spring frost date. Start plants indoors in flats or pots 8 to 10 weeks before the average last frost date. Set hot pepper plants 12 to 15 inches apart, larger bell types 15 to 18 inches apart. Provide windbreaks to minimize transplant shock.',


    'Select a site with full sun and well-drained soil. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

Most peppers, except for a few varieties like Sweet Banana, are green when young. Though bell peppers come in many colors, such as red, yellow, and purple, you can eat any of them in the green stage. However, they are sweeter if you let them ripen until the color is fully developed. Harvest by cutting through the stem of each fruit with a knife or with pruners. You can have an almost-continuous harvest from your pepper plants by cutting often, as this encourages the plant to keep blossoming, especially in the beginning of the summer.',


    'Provide deep watering weekly for pepper plants. Support bushy, heavy-yielding plants with 2-foot-high cages, or stake them. Apply heavy organic mulches when summer heat begins to peak. Temperatures over 90 degrees F can cause buds and blossoms to drop; the condition is more serious if humidity is low also. Pests are not a serious concern. However, contact your local County Extension office for controls of common pepper pests such as corn borers, flea beetles, and leaf miners.',


    'Zone 9: (-7 to -1 C)',


    'Full sun',


    'Moderate',


    'https://www.beautifulwildlifegarden.com/wp-content/uploads/2019/11/Tips-for-Growing-Peppers.jpg'
),

(
    'Paeonia lactiflora', 


    'Peony',


    'Peony varieties with huge, double flowers will be the focal point of the garden when they bloom in early summer. Single-flowered types are more subtle and combine well with other perennials. Flower colors include pink, red, white, and yellow, and the plants grow 18 inches to 3 feet tall, depending on the variety. Peonies make an attractive low hedge. However, they can take up to 3 years to mature, and don''t perform well in hot summer climates.',


    'Plant container-grown peonies in spring or fall, spacing plants 2 to 3 feet apart. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost. Dig a hole twice the diameter of the pot the plant is in. Carefully remove the plant from its container and place it in the hole so the top of the root ball is level with the soil surface. Carefully fill in around the root ball and firm the soil gently. Water thoroughly. Plant bare-root peonies in late summer or fall, setting the roots so that the buds are no more than two inches below the soil surface. If you plant them deeper, they may fail to bloom.',


    'Select a site with full sun and moist, well-drained soil.',


    'Apply a thin layer of compost each spring, followed by a 2-inch layer of mulch to retain moisture and control weeds. Water plants during the summer if rainfall is less than 1 inch per week. Stake tall varieties to keep them upright. After the first killing frost, cut stems back to an inch or two above soil line. The first winter, apply a 4- to 6-inch layer of protective mulch after the ground freezes, to prevent roots from being heaved out of the ground by alternate freezing and thawing. Once your peonies are established, annual winter mulching is not necessary. Remove this protective mulch in the spring.',


    'Zone 6: (-23 to -18 C)',


    'Full sun, Part sun/part shade, Sheltered',


    'Moderate',


    'https://www.almanac.com/sites/default/files/image_nodes/peony-pink-e.jpg'
),

(
    'Lilium longiflorum', 


    'Lily', 


    'Often with large, trumpet- or bowl-shaped flowers borne on tall stems, lilies in full bloom are the focal point of any perennial garden. Numerous types are available in almost any colour except black or blue and can be a single solid colour, spotted, striped or other intricate patterns. Lilies bloom in early summer to fall, depending on the type. Some are extremely fragrant and the vast majority make good cut flowers for large arrangements.',


    'Plant lily bulbs in spring or fall, spacing plants 8 to 18 inches apart, depending on variety. Prepare garden bed by using a garden fork or tiller to loosen soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost. Dig a hole about 6 inches deep and set the bulb in the hole, pointy end up. Fill the hole with soil and firm it gently. Water thoroughly. If hungry voles or mice are a problem, plant lily bulbs in buried wire cages to protect them from getting eaten.',


    'Select a site with full sun to light shade and well-drained soil. Most lilies prefer slightly acidic soil, although L. candidum (the Madonna Lily) prefers slightly alkaline and Martagons often do well with just a dusting of lime.',


    'Apply a thin layer of compost each spring, followed by a 2-inch layer of mulch to retain moisture and control weeds. Water plants during the summer if rainfall is less than 1 inch per week. Stake tall varieties to keep them upright. As flowers fade, dead-head the spent blooms. Once the stem and leaves turn brown at the end of the season, cut back at ground level.',


    'Zone 7: (-18 to -12 C)',


    'Full sun',


    'Moderate',


    'https://www.gardeningknowhow.com/wp-content/uploads/2013/05/Easter-Lily.jpg'
),

(
    'Tulipa cvs.', 


    'Tulip',


    'From stately formal plantings to naturalized woodland areas, there''s a type of tulip for every garden setting. Tulips grow best in areas with cold winters, cool springs, and cool summers. The smaller species tulips are reliably perennial, while larger types may need to be replanted every few years. Flower colors include apricot, pink, salmon, red, deep maroon, and white, and flowers may be double, ruffled, fringed, or lily-shaped, depending on the variety. Height ranges from 6 inches to 2 feet. By planting varieties with different bloom times, you can have tulips blooming from early to late spring. Some types are good for forcing into bloom indoors.',


    'Plant tulip bulbs in fall, six to eight weeks before a hard frost is expected and when soils are below 60 degrees F. This is usually during September and October in the north, and October and November in the south. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost. Dig a hole about three times as deep as the height of the bulb. Set the bulb in the hole, pointy end up, then cover with soil and press firmly. Space bulbs 4 to 6 inches apart. Water thoroughly after planting. If hungry voles or mice are a problem, plant bulbs in buried wire cages to protect them from getting eaten.',


    'Select a site with full sun to light shade and well-drained soil. Tall varieties should be sheltered from strong winds.',


    'Keep tulips watered during dry spells in the fall. After plants are finished flowering in spring, cut back flower stalks but allow the leaves to die back naturally, hiding the unsightly foliage with annual or perennial plantings. An annual application of compost should provide adequate nutrients. Large varieties may need replanting every few years; small types usually multiply and spread on their own.',


    'Zone 4: (-34 to -29 C)',


    'Full sun',


    'Moderate',


    'https://garden.org/pics/2014-02-03/dirtdorphins/59e635.jpg'
);

